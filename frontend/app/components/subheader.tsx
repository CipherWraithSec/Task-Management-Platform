"use client";
import { Plus, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { AppToggle } from "./ui/navbar-16";
// import { useModalStore } from "@/store/modalStore"
// import { useDashboardStore } from "@/store/dashboardStore"

const SubHeader = () => {
  //   const { setIsAddModalOpen } = useModalStore();
  //   const { boardView } = useDashboardStore();

  return (
    <div className="mb-4 flex items-center justify-between  ">
      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Middle area */}
        <Button size="sm" className="text-sm max-sm:aspect-square max-sm:p-0">
          <PlusIcon
            className="opacity-60 sm:-ms-1"
            size={16}
            aria-hidden={true}
          />
          <span className="max-sm:sr-only">Add Task</span>
        </Button>
      </div>
    </div>
  );
};

export default SubHeader;
