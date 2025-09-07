import { Task } from 'generated/prisma';

export class PaginationResponseDto<T> {
  items: Task[];
  total: number;
  page: number;
  limit: number;
}
