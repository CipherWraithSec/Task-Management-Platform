"use client";
import React from "react";
import TaskModal from "./TaskModal";
import { useAddTaskMutation, useTaskQuery } from "../hooks/useTask";
import { toast } from "sonner";
import { ArrowUp } from "lucide-react";
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
import { TaskData } from "../types/types";
import { useAppDispatch } from "../hooks/redux";
import { setOpenTaskHistoryModal } from "../lib/redux/features/modal/modalSlice";
import {
  setPage,
  setSort,
  setTask,
  useTasks,
} from "../lib/redux/features/task/taskSlice";
import { Loader } from "./loader";
import { Button } from "./ui/button";

const TaskList = () => {
  const dispatch = useAppDispatch();

  const { page, limit, sortBy, sortOrder } = useTasks();

  const { data, isLoading } = useTaskQuery();

  const { mutate } = useAddTaskMutation();

  // Handle task status change
  const handleOnValueChange = (value: TaskData["status"], task: TaskData) => {
    // Dispatch the task first if needed
    dispatch(setTask(task));

    // Pass the full task object with the updated status
    mutate(
      { ...task, status: value },
      {
        onSuccess: () => {
          dispatch(setTask(null));
          toast.success("Task updated successfully");
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  // Open task history modal
  const handleTaskHistory = (task: TaskData) => {
    dispatch(setTask(task));
    dispatch(setOpenTaskHistoryModal(true));
  };

  const handleNextPage = () => {
    if (data && page < Math.ceil(data.total / limit)) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handleSort = (field: string) => {
    const newSortOrder =
      sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSort({ sortBy: field, sortOrder: newSortOrder }));
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="  py-4 space-y-2">
          {data?.items?.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
              No tasks found
            </div>
          ) : (
            <div>
              <Table className="overflow-x-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("title")}
                      className="text-nowrap cursor-pointer "
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-nowrap font-bold text-[16px] md:text-lg">
                          Tasks
                        </span>
                        {sortBy === "title" && (
                          <ArrowUp
                            className={`h-4 w-4 transition-transform ${
                              sortOrder === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-nowrap font-bold text-[16px] md:text-lg">
                      Status
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("createdAt")}
                      className="text-nowrap cursor-pointer hidden md:table-cell"
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-nowrap font-bold text-[16px] md:text-lg">
                          Date Added
                        </span>
                        {sortBy === "createdAt" && (
                          <ArrowUp
                            className={`h-4 w-4 transition-transform ${
                              sortOrder === "desc" ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className=" text-nowrap text-right font-bold text-[16px] md:text-lg">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.items?.map((task) => (
                    <TableRow key={task.id} className="">
                      <TableCell
                        className="space-y-2 w-1/2 capitalize"
                        onClick={() => handleTaskHistory(task)}
                      >
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
                          onValueChange={async (value: TaskData["status"]) =>
                            handleOnValueChange(value, task)
                          }
                        >
                          <SelectTrigger className="bg-background   w-1/2 max-md:w-full">
                            <SelectValue placeholder={"Status"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="cursor-text-nowrap cursor-pointer hidden md:table-cell">
                        {task.createdAt &&
                          format(task.createdAt, "MMM d, yyyy")}
                      </TableCell>

                      <TableCell className="text-right ">
                        <MoreMenu task={task} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end items-center space-x-4 mt-14">
                <Button onClick={handlePreviousPage} disabled={page === 1}>
                  Previous
                </Button>
                <span>
                  {" "}
                  Page {page} of {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={page >= totalPages}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
