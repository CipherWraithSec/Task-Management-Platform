"use client";

import { useEffect } from "react"; //
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { addTaskSchema } from "../lib/schema";
import {
  setOpenTaskModal,
  useModal,
} from "../lib/redux/features/modal/modalSlice";
import { TaskStatus } from "../types/types";
import { useAddTaskMutation } from "../hooks/useTask";
import { useAppDispatch } from "../hooks/redux";
import { setTask, useTasks } from "../lib/redux/features/task/taskSlice";

export type AddTaskFormData = z.infer<typeof addTaskSchema>;

const TaskModal = () => {
  const { isTaskModalOpen } = useModal();
  const { activeTask } = useTasks();
  const dispatch = useAppDispatch();

  const form = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "", // Set initial values to empty strings
      description: "",
      status: TaskStatus.Pending,
    },
  });

  // Effect to reset the form with `activeTask` details when the modal opens
  useEffect(() => {
    if (isTaskModalOpen && activeTask) {
      form.reset({
        title: activeTask.title,
        description: activeTask.description,
        status: activeTask.status,
      });
    }
  }, [isTaskModalOpen, activeTask, form]);

  // Toggle modal and reset form
  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      form.reset(); //
      if (activeTask) {
        dispatch(setTask(null));
      }
      dispatch(setOpenTaskModal(false));
    }
  };

  const { mutate, isPending } = useAddTaskMutation();

  // Handle form submission
  const onSubmit = (values: AddTaskFormData) => {
    mutate(values, {
      onSuccess: () => {
        if (!activeTask) {
          toast.success("Task created successfully");
        }
        if (activeTask) {
          toast.success("Task updated successfully");
          dispatch(setTask(null));
        }
        form.reset();
        dispatch(setOpenTaskModal(false));
      },
      onError: (error: any) => {
        console.log("Error message for toast:", error.message);
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={isTaskModalOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activeTask?.id ? "Edit Task" : "Create Task"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            + {activeTask?.id ? "Edit the task details." : "Create a new task."}
            +{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter task title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter task description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(TaskStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {activeTask
                  ? isPending
                    ? "Updating..."
                    : "Update Task"
                  : isPending
                  ? "Creating..."
                  : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
