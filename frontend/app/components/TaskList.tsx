import React, { useEffect } from "react";
import TaskModal from "./TaskModal";
import { useAddTaskMutation, useTaskQuery } from "../hooks/useTask";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import MoreMenu from "./MoreMenu";
import { ITaskData, TaskStatus } from "../types/types";
import { useAppDispatch } from "../hooks/redux";
import { setOpenTaskModal } from "../lib/redux/features/modal/modalSlice";
import { setTask } from "../lib/redux/features/task/taskSlice";
import { Loader } from "./loader";

const TaskList = () => {
  const { data, isLoading } = useTaskQuery();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useAddTaskMutation();

  const handleOnValueChange = (value: ITaskData, task: ITaskData) => {
    dispatch(setTask(task));
    mutate(value, {
      onSuccess: () => {
        dispatch(setTask(null));
        toast.success("Task updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="  py-4 space-y-2">
          {data?.length == 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
              No tasks found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-nowrap">Date Added</TableHead>
                  <TableHead className="text-nowrap text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((task) => (
                  <TableRow key={task.id} className="">
                    <TableCell className="space-y-2  text-nowrap w-1/2 capitalize">
                      <div>
                        <h3 className="font-semibold text-lg md:text-xl">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-s md:text-sm text-gray-700 mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-nowrap  ">
                      <Select
                        value={task.status}
                        defaultValue={task.status}
                        onValueChange={async (value) =>
                          handleOnValueChange({ status: value }, task)
                        }
                      >
                        <SelectTrigger className="bg-background w-1/2">
                          <SelectValue placeholder={"Status"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="text-nowrap ">
                      {task.createdAt && format(task.createdAt, "MMM d, yyyy")}
                    </TableCell>

                    <TableCell className="text-right ">
                      <MoreMenu task={task} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-left text-sm" colSpan={5}>
                    Total Tasks : {data?.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
