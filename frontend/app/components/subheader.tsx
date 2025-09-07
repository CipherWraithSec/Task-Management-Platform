"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/app/hooks/redux";
import { setOpenTaskModal } from "@/app/lib/redux/features/modal/modalSlice";
import {
  setStatusFilter,
  setTask,
  useTasks,
} from "../lib/redux/features/task/taskSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TaskData } from "../types/types";

const SubHeader = () => {
  const dispatch = useAppDispatch();
  const { statusFilter } = useTasks();

  const handleAddTask = () => {
    dispatch(setTask(null));
    dispatch(setOpenTaskModal(true));
  };

  const handleStatusFilterChange = (value: string) => {
    dispatch(setStatusFilter(value as TaskData["status"] | "all"));
  };

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
        <SelectTrigger className="w-fit px-4 bg-background dark:bg-secondary">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size="sm"
        className="text-sm max-sm:aspect-square max-sm:p-0"
        onClick={() => handleAddTask()}
      >
        <PlusIcon
          className="opacity-60 sm:-ms-1"
          size={16}
          aria-hidden={true}
        />
        <span className="max-sm:sr-only">Add Task</span>
      </Button>
    </div>
  );
};

export default SubHeader;
