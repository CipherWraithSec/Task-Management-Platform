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
export interface ITaskData {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdById: string;
}
