import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";

// Factory function called on server to create a new store for each SSR request to keep state isolated
export const makeStore = () => {
  return configureStore({
    reducer: {
      task: taskReducer,
      auth: authReducer,
      modal: modalReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
