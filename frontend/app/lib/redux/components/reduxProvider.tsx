"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../store";
import { setAuthStatus } from "../features/auth/authSlice";

interface ProvidersProps {
  children: React.ReactNode;
  initialAuthStatus: boolean;
}

const ReduxProvider = ({ children, initialAuthStatus }: ProvidersProps) => {
  // Ensures the store is created only once on the client side, maintaining its state throughout the user's session.
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this component is rendered
    storeRef.current = makeStore();

    // Dispatch the initial auth state from the server to the store
    storeRef.current.dispatch(setAuthStatus(initialAuthStatus));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
