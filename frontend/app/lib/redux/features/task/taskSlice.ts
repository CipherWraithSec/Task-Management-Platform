import { useAppSelector } from "@/app/hooks/redux";
import { ITaskData } from "@/app/types/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

type taskManagerState = {
  taskData: ITaskData[];
};

const initialState: taskManagerState = {
  taskData: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITaskData>) => {},
  },
});

export const useTasks = () => useAppSelector((state) => state.task);

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
