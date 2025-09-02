"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/redux/store";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // To prevent reinitializing the Redux store on every render
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
