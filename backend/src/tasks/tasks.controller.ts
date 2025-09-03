import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { CurrentUser } from '../auth/currentUser.decorator';
import type { TokenPayload } from '../auth/tokenPayload.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.taskService.createTask(body, user.userId);
  }
}
