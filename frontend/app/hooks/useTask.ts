"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTaskFormData } from "../components/TaskModal";
import {
  deleteDataAction,
  fetchDataAction,
  postDataAction,
  updateDataAction,
} from "../actions";
import { TaskData, ITaskHistory } from "../types/types";
import { useTasks } from "../lib/redux/features/task/taskSlice";
import useDebounce from "./useDebounce";

type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

// Add/Update task
export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();

  const { activeTask } = useTasks();
  return useMutation({
    mutationFn: (data: AddTaskFormData): Promise<TaskData> => {
      // If there's an active task, update it; otherwise, create a new one
      if (activeTask) {
        console.log("Updating Task:", data);
        return updateDataAction(`/tasks/${activeTask.id}`, data);
      } else {
        return postDataAction("/tasks", data);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["taskHistory"],
      });
    },
  });
};

// Retrieve a list of tasks
export const useTaskQuery = () => {
  const { page, limit, sortBy, sortOrder, searchTerm } = useTasks();

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Add this line to log the parameters being sent
  console.log("Query parameters:", {
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm: debouncedSearch,
  });

  // Prepare the params object, filtering out null or undefined values
  const params: Record<string, any> = {
    page,
    limit,
    sortBy,
    sortOrder,
  };
  if (debouncedSearch) {
    params.searchTerm = debouncedSearch;
  }

  const queryKey = ["tasks", params];

  const queryFn = (): Promise<PaginatedResponse<TaskData>> =>
    fetchDataAction("/tasks", params);

  return useQuery({
    queryKey,
    queryFn,
  });
};

// Retrieve history for a given task.
export const useTaskHistoryQuery = (taskId: string | undefined) => {
  return useQuery({
    // When the taskId changes, it should fetch new data.
    queryKey: ["taskHistory", taskId],
    queryFn: (): Promise<ITaskHistory[]> =>
      fetchDataAction(`/tasks/history/${taskId}`),

    // Query only runs when there's a valid taskId
    enabled: !!taskId,
  });
};

// Soft-delete a task
export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => deleteDataAction(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["taskHistory"],
      });
    },
  });
};
