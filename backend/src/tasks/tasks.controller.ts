import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { CurrentUser } from '../auth/currentUser.decorator';
import type { TokenPayload } from '../auth/tokenPayload.interface';
import { TasksService } from './tasks.service';
import { Task } from 'generated/prisma';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: TokenPayload,
  ): Promise<Task> {
    return this.taskService.createTask(body, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks() {
    return this.taskService.getTasks();
  }
}
