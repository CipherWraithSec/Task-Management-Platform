"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { CheckSquare } from "lucide-react";
import { useTaskHistoryQuery } from "../hooks/useTask";
import {
  setOpenTaskHistoryModal,
  useModal,
} from "../lib/redux/features/modal/modalSlice";
import { useAppDispatch } from "../hooks/redux";
import { setTask, useTasks } from "../lib/redux/features/task/taskSlice";
import { Loader } from "./loader";
import { format } from "date-fns";

export const TaskHistoryModal = () => {
  const dispatch = useAppDispatch();
  const { isTaskHistoryModalOpen } = useModal();

  const { activeTask } = useTasks();

  const { data, isLoading } = useTaskHistoryQuery(activeTask?.id);

  // Handle modal close
  const handleTaskHistoryModalClose = () => {
    dispatch(setTask(null));
    dispatch(setOpenTaskHistoryModal(false));
  };

  return (
    <Dialog
      open={isTaskHistoryModalOpen}
      onOpenChange={handleTaskHistoryModalClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle> History for "{activeTask?.title}" task </DialogTitle>
          <DialogDescription className="sr-only">
            {"Task History"}
          </DialogDescription>
        </DialogHeader>
        {isLoading && <Loader />}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            {data?.map((activity) => (
              <div key={activity.id} className="flex gap-2">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckSquare className="h-5 w-5 text-green-600 rounded-full" />
                </div>

                <div>
                  <p className="text-sm">
                    {activity.changeReason} on{" "}
                    {format(activity.changedAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleTaskHistoryModalClose()}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
