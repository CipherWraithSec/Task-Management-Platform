"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import React, { useState } from "react";
import { getQueryClient } from "./getQueryClient";
import ReduxProvider from "./lib/redux/components/reduxProvider";
import { store } from "./lib/redux/store";

// const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Create a new store instance for every request to avoid state sharing
  const reduxStore = store();

  const queryClient = getQueryClient();

  return (
    <ReduxProvider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            className: "bg-background text-foreground border border-border",
            style: {
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
