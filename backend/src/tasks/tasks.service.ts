import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task, TaskHistory } from 'generated/prisma';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { PaginationResponseDto } from './dto/paginationResponse.dto';
import { GetTasksDto } from './dto/getTasks.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, createdById: string): Promise<Task> {
    try {
      // Transaction to ensure both task creation and history logging succeed or fail together
      return await this.prismaService.$transaction(async (prisma) => {
        // Create the task
        const task = await prisma.task.create({
          data: {
            ...data,
            createdById,
          },
        });
        // Log the creation in TaskHistory
        await prisma.taskHistory.create({
          data: {
            taskId: task.id,
            fieldName: 'creation',
            previousValue: null, // No previous status on creation
            newValue: task.status,
            changeReason: 'Task created',
            changedById: createdById,
          },
        });

        return task;
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A task with this title already exists.');
      }
      throw error;
    }
  }

  async getTasks(params: GetTasksDto): Promise<PaginationResponseDto<Task[]>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'asc',
      searchTerm,
      status,
    } = params;

    const whereClause: Prisma.TaskWhereInput = {
      deletedAt: null, // soft-delete filter
      ...(searchTerm && {
        title: {
          contains: searchTerm,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(status && {
        status: status,
      }),
    };

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereClause,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prismaService.task.count({
        where: whereClause,
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async updateTask(
    id: string,
    data: UpdateTaskDto,
    updatedById: string,
  ): Promise<Task> {
    return await this.prismaService.$transaction(async (prisma) => {
      // Fetch the current task state
      const currentTask = await prisma.task.findFirst({
        where: { id, deletedAt: null },
      });

      if (!currentTask) {
        throw new NotFoundException('Task not found');
      }

      interface ChangeToLog {
        fieldName: string;
        previousValue: string | null;
        newValue: string | null;
        changeReason: string;
      }

      // Track changes to be logged
      const changesToLog: ChangeToLog[] = [];

      // Check for status change
      if (data.status && data.status !== currentTask.status) {
        changesToLog.push({
          fieldName: 'status',
          previousValue: currentTask.status,
          newValue: data.status,
          changeReason: 'Status updated',
        });
      }

      // Check for title change
      if (data.title && data.title !== currentTask.title) {
        changesToLog.push({
          fieldName: 'title',
          previousValue: currentTask.title,
          newValue: data.title,
          changeReason: 'Title updated',
        });
      }

      // Check for description change
      if (data.description && data.description !== currentTask.description) {
        changesToLog.push({
          fieldName: 'description',
          previousValue: currentTask.description,
          newValue: data.description,
          changeReason: 'Description updated',
        });
      }

      // Log all changes at once if any were found
      if (changesToLog.length > 0) {
        await prisma.taskHistory.createMany({
          data: changesToLog.map((change) => ({
            taskId: id,
            fieldName: change.fieldName,
            previousValue: change.previousValue,
            newValue: change.newValue,
            changeReason: change.changeReason,
            changedById: updatedById,
          })),
        });
      }

      // Perform the update
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...data,
        },
      });

      return updatedTask;
    });
  }

  async softDeleteTask(id: string, deletedById: string): Promise<void> {
    // Use a transaction to ensure both operations succeed or fail together
    await this.prismaService.$transaction(async (prisma) => {
      const currentTask = await prisma.task.findFirst({
        where: { id, deletedAt: null },
      });
      if (!currentTask) {
        throw new NotFoundException('Task not found');
      }
      // Add deletion in history
      await prisma.taskHistory.create({
        data: {
          taskId: id,
          fieldName: 'deletion',
          previousValue: currentTask.status,
          newValue: null, // last status before deletion
          changeReason: 'Task deleted',
          changedById: deletedById,
        },
      });
      // Soft-delete the task by setting deletedAt timestamp
      await prisma.task.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });
  }

  // Retrieve a task by id (active tasks only) with its related history entries.
  // async getTaskById(taskId: string) {
  //   const task = await this.prismaService.task.findFirst({
  //     where: { id: taskId, deletedAt: null },
  //     include: { histories: true },
  //   });
  //   if (!task) {
  //     throw new NotFoundException('Task not found');
  //   }
  //   return task;
  // }

  // Retrieve history for a given task.
  async getTaskHistory(taskId: string): Promise<TaskHistory[]> {
    return this.prismaService.taskHistory.findMany({
      where: { taskId },
      orderBy: { changedAt: 'desc' },
    });
  }
}
