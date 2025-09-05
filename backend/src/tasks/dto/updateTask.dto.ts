import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';
import { TaskStatus } from '../../common/constants/task.constant';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Optional allows creating a task with an initial status (pending).
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: pending, in_progress, completed',
  })
  status?: TaskStatus;

  // Optional field to capture the reason for a status change
  @IsOptional()
  @IsString()
  changeReason?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @IsOptional()
  @IsString()
  createdById?: string;
}
