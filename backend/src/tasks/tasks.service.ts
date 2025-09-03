import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(data: CreateTaskDto, userId: string) {
    return this.prismaService.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }
}
