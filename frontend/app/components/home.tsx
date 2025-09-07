"use client";

import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal";
import SubHeader from "./Subheader";
import TaskList from "./TaskList";
import { TaskHistoryModal } from "./TaskHistoryModal";
import { useModal } from "../lib/redux/features/modal/modalSlice";

export default function Home() {
  const { isTaskModalOpen, isDeleteModalOpen, isTaskHistoryModalOpen } =
    useModal();

  return (
    <div className="flex max-sm:flex-col h-screen bg-secondary dark:bg-background">
      <div className="flex-1 p-8 overflow-auto ">
        <SubHeader />
        <TaskList />
        {isTaskModalOpen && <TaskModal />}
        {isDeleteModalOpen && <DeleteModal />}
        {isTaskHistoryModalOpen && <TaskHistoryModal />}
      </div>
    </div>
  );
}
