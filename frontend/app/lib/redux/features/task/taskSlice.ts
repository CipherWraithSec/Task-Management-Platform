import { useAppSelector } from "@/app/hooks/redux";
import { TaskData } from "@/app/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type taskManagerState = {
  activeTask: TaskData | null;
  searchTerm: string;
  page: number;
  limit: number;
  sortBy: string; // Default sort field
  sortOrder: string; // 'asc' or 'desc'
};

const initialState: taskManagerState = {
  activeTask: null,
  searchTerm: "",
  page: 1,
  limit: 10,
  sortBy: "createdAt", // Default sort field
  sortOrder: "asc", // 'asc' or 'desc'
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskData | null>) => {
      state.activeTask = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: string }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const useTasks = () => useAppSelector((state) => state.task);

export const { setTask, setPage, setLimit, setSort, setSearchTerm } =
  taskSlice.actions;
export default taskSlice.reducer;
