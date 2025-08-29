"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import React from "react";

const queryClient = new QueryClient();

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
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
  );
}
