import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from 'generated/prisma';
import { UpdateTaskDto } from './dto/updateTask.dto';
import e from 'express';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, createdById: string): Promise<Task> {
    // Create the task
    const task = await this.prismaService.task.create({
      data: {
        ...data,
        createdById,
      },
    });

    // Log task creation in history
    await this.prismaService.taskHistory.create({
      data: {
        taskId: task.id,
        previousStatus: null, // no previous status on creation
        newStatus: task.status,
        changeReason: 'Task created',
        changedById: createdById,
      },
    });

    return task;
  }

  async getTasks(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async updateTask(
    id: string,
    data: UpdateTaskDto,
    updatedById: string,
  ): Promise<Task> {
    const currentTask = await this.prismaService.task.findFirst({
      where: { id, deletedAt: null },
    });

    if (!currentTask) {
      throw new NotFoundException('Task not found');
    }

    // If status is updated, record the change in TaskHistory
    if (data.status && data.status !== currentTask.status) {
      await this.prismaService.taskHistory.create({
        data: {
          taskId: id,
          previousStatus: currentTask.status,
          newStatus: data.status,
          changeReason: 'Status updated',
          changedById: updatedById,
        },
      });
    }

    // Title change
    if (data.title && data.title !== currentTask.title) {
      await this.prismaService.taskHistory.create({
        data: {
          taskId: id,
          previousStatus: currentTask.title,
          newStatus: data.title,
          changeReason: 'Title updated',
          changedById: updatedById,
        },
      });
    }

    // Description change
    if (data.description && data.description !== currentTask.description) {
      await this.prismaService.taskHistory.create({
        data: {
          taskId: id,
          previousStatus: currentTask.description,
          newStatus: data.description,
          changeReason: 'Description updated',
          changedById: updatedById,
        },
      });
    }

    // Update task record
    const updatedTask = await this.prismaService.task.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedTask;
  }

  async softDeleteTask(id: string, deletedById: string): Promise<void> {
    // Fetch the task to ensure it exists and isn't already deleted
    const currentTask = await this.prismaService.task.findFirst({
      where: { id, deletedAt: null },
    });
    if (!currentTask) {
      throw new NotFoundException('Task not found');
    }

    // Add deletion in history
    await this.prismaService.taskHistory.create({
      data: {
        taskId: id,
        previousStatus: currentTask.status,
        newStatus: 'deleted', // or you can add 'deleted' as a custom status if needed
        changeReason: 'Task deleted',
        changedById: deletedById,
      },
    });

    // Soft-delete the task by setting deletedAt timestamp
    await this.prismaService.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
