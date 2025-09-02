"use client";
import { useUserQuery } from "./hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";
import SubHeader from "./components/subheader";

export default function Home() {
  const { data, isPending, isError, error } = useUserQuery() as {
    data: any;
    isPending: boolean;
    isError: boolean;
    error: any;
  };

  useEffect(() => {
    if (isError) {
      console.error("Error message for toast:", error.message);
      toast.error(error.message);
    } else {
      console.log("user data:", data);
    }
  }, [isError, error]);

  return (
    <div className="flex max-sm:flex-col h-screen bg-secondary dark:bg-background">
      <div className="flex-1 p-8 overflow-auto ">
        <SubHeader />
        <div className="m-auto">
          <h1 className="text-4xl font-bold">Welcome</h1>

          <p className="mt-4"> {JSON.stringify(data)}</p>
        </div>
      </div>
    </div>
  );
}
