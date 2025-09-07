import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { CurrentUser } from '../auth/currentUser.decorator';
import type { TokenPayload } from '../auth/tokenPayload.interface';
import { TasksService } from './tasks.service';
import { Task, TaskHistory } from 'generated/prisma';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { PaginationResponseDto } from './dto/paginationResponse.dto';
import { GetTasksDto } from './dto/getTasks.dto';

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
  async getTasks(
    @Query() query: GetTasksDto,
  ): Promise<PaginationResponseDto<Task[]>> {
    return this.taskService.getTasks(query);
  }

  @Get('/history/:taskId')
  @UseGuards(JwtAuthGuard)
  async getTaskHistoryById(
    @Param('taskId') taskId: string,
  ): Promise<TaskHistory[]> {
    return this.taskService.getTaskHistory(taskId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @CurrentUser() user: TokenPayload,
  ): Promise<Task> {
    return this.taskService.updateTask(id, body, user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @Param('id') id: string,
    @CurrentUser() user: TokenPayload,
  ): Promise<void> {
    return this.taskService.softDeleteTask(id, user.userId);
  }
}
