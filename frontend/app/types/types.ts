export type view = "list" | "board";

export type User = {
  name: string;
  email: string;
  token: string;
};

export enum TaskStatus {
  Pending = "pending",
  In_Progress = "in_progress",
  Completed = "completed",
}
export type TaskData = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdById: string;
};

export interface IPaginatedResponse {
  items: TaskData[];
  total: number;
  page: number;
  limit: number;
}

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export interface ITaskHistory {
  id: string;
  taskId: string;
  fieldName: string;
  previousValue?: string | null;
  newValue?: string | null;
  changeReason?: string | null;
  changedAt: Date;
  changedById: string;
}
