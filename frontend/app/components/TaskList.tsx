import React, { useEffect } from "react";
import AddTaskModal from "./AddTaskModal";
import { useTaskQuery } from "../hooks/useTask";
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

const TaskList = () => {
  const { data, isPending, isError, error } = useTaskQuery();

  useEffect(() => {
    if (isError) {
      console.error("Error message for toast:", error.message);
      toast.error(error.message);
    } else {
      console.log("user data:", data);
    }
  }, [isError, error, data]);

  return (
    <div>
      <p>TaskList</p>

      {/* Tasks */}
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
                {/* <TableHead>Priority</TableHead> */}
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
                      <h3 className="font-semibold text-base   ">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-xs md:text-s text-gray-500 dark:text-gray-400 mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-nowrap  ">
                    <Select
                      value={task.status}
                      defaultValue={task.status}
                      //   onValueChange={async (value) => {
                      //     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatetask`;
                      //     const headers = {
                      //       method: "POST",
                      //       headers: {
                      //         "Content-Type": "application/json",
                      //       },
                      //       body: JSON.stringify({ ...task, status: value }),
                      //     };
                      //     const res = await fetch(url, headers);
                      //     const data = await res.json();

                      //     updateTask({ ...task, status: value as TaskStatus });
                      //     toast({
                      //       title: "Task Updated",
                      //       variant: "default",
                      //       className: "bg-green-400 text-black",
                      //       duration: 2000,
                      //     });
                      //   }}
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
      <AddTaskModal />
    </div>
  );
};

export default TaskList;
