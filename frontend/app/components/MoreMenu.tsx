"use client";

import React from "react";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TaskData } from "../types/types";
import { setTask } from "../lib/redux/features/task/taskSlice";
import {
  setOpenTaskModal,
  setOpenDeleteModal,
} from "../lib/redux/features/modal/modalSlice";
import { useAppDispatch } from "../hooks/redux";

const MoreMenu = ({ task }: { task: TaskData }) => {
  const dispatch = useAppDispatch();

  // To open the delete modal
  const handleDeleteTask = () => {
    dispatch(setTask(task));
    dispatch(setOpenDeleteModal(true));
  };

  // To open the edit modal
  const handleEditTask = () => {
    dispatch(setTask(task));
    dispatch(setOpenTaskModal(true));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEditTask()}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteTask()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreMenu;
