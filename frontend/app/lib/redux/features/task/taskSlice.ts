import { useAppSelector } from "@/app/hooks/redux";
import { ITaskData } from "@/app/types/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

type taskState = {
  taskData: ITaskData[];
  isAuthenticated: boolean
};

const initialState: taskState = {
  taskData: [],
  isAuthenticated: 
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
