import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";

// Factory function to create a new store instance
export const store = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
