export type view = "list" | "board";

export type User = {
  name: string;
  email: string;
  token: string;
};

enum taskStatus {
      Pending: "pending",        
      InProgress: "in-progress",      
      Completed: "completed"      
    }

export interface ITaskData {
  id: string;
  title: string;
  description?: string;
  status: taskStatus;
  createdAt: Date;
  updatedAt: Date;
}
