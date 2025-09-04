"use client";

import SubHeader from "./Subheader";
import TaskList from "./TaskList";

export default function Home() {
  return (
    <div className="flex max-sm:flex-col h-screen bg-secondary dark:bg-background">
      <div className="flex-1 p-8 overflow-auto ">
        <SubHeader />
        <TaskList />
      </div>
    </div>
  );
}
