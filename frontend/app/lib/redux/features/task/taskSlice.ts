import { useAppSelector } from "@/app/hooks/redux";
import { ITaskData } from "@/app/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type taskManagerState = {
  activeTask: ITaskData | null;
};

const initialState: taskManagerState = {
  activeTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<ITaskData | null>) => {
      state.activeTask = action.payload;
    },
  },
});

export const useTasks = () => useAppSelector((state) => state.task);

export const { setTask } = taskSlice.actions;
export default taskSlice.reducer;
