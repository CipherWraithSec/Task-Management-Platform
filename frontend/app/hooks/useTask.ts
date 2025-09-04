import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTaskFormData } from "../components/AddTaskModal";
import { fetchDataAction, postDataAction } from "../actions";
import { ITaskData } from "../types/types";

export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddTaskFormData): Promise<ITaskData> =>
      postDataAction("/tasks", data),
    onSuccess: (newData) => {
      //   queryClient.setQueryData(["tasks"], data);

      // Update the 'oldData' list in the cache with the new data
      queryClient.setQueryData(
        ["tasks"],
        (oldData: ITaskData[] | undefined) => {
          // oldData might be undefined if the list hasn't been fetched yet
          return oldData ? [...oldData, newData] : [newData];
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
