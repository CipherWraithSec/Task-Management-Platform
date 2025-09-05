import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTaskFormData } from "../components/TaskModal";
import {
  deleteDataAction,
  fetchDataAction,
  postDataAction,
  updateDataAction,
} from "../actions";
import { ITaskData, TaskStatus } from "../types/types";
import { useTasks } from "../lib/redux/features/task/taskSlice";

export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();

  const { activeTask } = useTasks();
  return useMutation({
    mutationFn: (data: AddTaskFormData): Promise<ITaskData> => {
      // If there's an active task, update it; otherwise, create a new one
      if (activeTask) {
        return updateDataAction(`/tasks/${activeTask.id}`, data);
      } else {
        return postDataAction("/tasks", data);
      }
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ["tasks"],
        (oldData: ITaskData[] | undefined) => {
          if (!oldData) {
            return [newData];
          }

          // Check if an existing task is being updated
          const isUpdating = oldData.some((task) => task.id === newData.id);

          if (isUpdating) {
            // If it's an update, replace the old version with the new one
            return oldData.map((task) =>
              task.id === newData.id ? newData : task
            );
          } else {
            // If it's a new task, append it to the list
            return [...oldData, newData];
          }
        }
      );
    },
  });
};

export const useTaskQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: (): Promise<ITaskData[]> => fetchDataAction("/tasks"),
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => deleteDataAction(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
