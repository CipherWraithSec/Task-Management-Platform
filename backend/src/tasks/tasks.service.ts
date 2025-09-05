import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from 'generated/prisma';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, createdById: string): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return this.prismaService.task.create({
      data: {
        ...data,
        createdById,
      },
    });
  }

  async getTasks(): Promise<Task[]> {
    return this.prismaService.task.findMany();
  }

  async updateTask(
    id: string,
    data: UpdateTaskDto,
    updatedById: string,
  ): Promise<Task> {
    console.log('Data to be updated:', data);
    return this.prismaService.task.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteTask(id: string, deletedById: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.prismaService.task.delete({
      where: { id },
    });
  }
}
