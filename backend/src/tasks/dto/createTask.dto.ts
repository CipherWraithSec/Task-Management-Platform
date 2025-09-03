import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../../common/constants/task.constant';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Optional allows creating a task with an initial status (pending).
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: pending, in_progress, completed',
  })
  status?: TaskStatus;
}
