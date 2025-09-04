import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from 'generated/prisma';

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
}
