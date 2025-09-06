"use client";
import { Plus, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/app/hooks/redux";
import { setOpenTaskModal } from "@/app/lib/redux/features/modal/modalSlice";
import { setTask } from "../lib/redux/features/task/taskSlice";

const SubHeader = () => {
  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    dispatch(setTask(null));
    dispatch(setOpenTaskModal(true));
  };

  return (
    <div className="mb-4 flex items-center justify-between  ">
      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Middle area */}
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
    </div>
  );
};

export default SubHeader;
