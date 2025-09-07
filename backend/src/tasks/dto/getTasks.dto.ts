// src/tasks/dto/get-tasks.dto.ts
import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus } from 'generated/prisma';

export class GetTasksDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'title']) // Restrict to valid sortable fields
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  searchTerm?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
