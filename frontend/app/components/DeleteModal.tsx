"use client";

import { toast } from "sonner";
import { useAppDispatch } from "../hooks/redux";
import {
  setOpenDeleteModal,
  useModal,
} from "../lib/redux/features/modal/modalSlice";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { setTask, useTasks } from "../lib/redux/features/task/taskSlice";
import { useDeleteTaskMutation } from "../hooks/useTask";

const DeleteModal = () => {
  const dispatch = useAppDispatch();

  const { isDeleteModalOpen } = useModal();

  const { activeTask } = useTasks();

  // To reset the state when the modal is closed
  const handleOnOpenChange = () => {
    dispatch(setTask(null));
    dispatch(setOpenDeleteModal(false));
  };

  const { mutate, isPending } = useDeleteTaskMutation();

  // To delete the task
  const handleDeleteTask = async () => {
    if (activeTask) {
      mutate(activeTask.id, {
        onSuccess: () => {
          toast.success("Task deleted successfully");
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      });

      dispatch(setTask(null));
      dispatch(setOpenDeleteModal(false));
    }
  };

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription className="sr-only">
            {"Confirm Deletion"}
          </DialogDescription>
          <DialogDescription>
            Are you sure you want to delete the task `{activeTask?.title}`?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOnOpenChange()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteTask}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
