// import { useAuth } from "@/provider/auth-context";
// import type { Workspace } from "@/types";

import { Button } from "./ui/button";
import { Bell, PlusCircle, SearchIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
// import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
// import { WorkspaceAvatar } from "../workspace/workspace-avatar";

interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

export const Header = () => {
  // const navigate = useNavigate();

  // const { user, logout } = useAuth();
  // const { workspaces } = useLoaderData() as { workspaces: Workspace[] };
  // const isOnWorkspacePage = useLocation().pathname.includes("/workspace");

  // const handleOnClick = (workspace: Workspace) => {
  // onWorkspaceSelected(workspace);
  // const location = window.location;
  // if (isOnWorkspacePage) {
  // navigate(`/workspaces/${workspace._id}`);
  // } else {
  // const basePath = location.pathname;
  // navigate(`${basePath}?workspaceId=${workspace._id}`);
  // }
  // };

  return (
    <div className="bg-background sticky top-0 z-40 border-b shadow-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4">
        <h1 className="text-md  md:text-xl font-bold dark:text-white">
          Task Manager
        </h1>

        {/* middle */}
        <div className="relative flex-1">
          <Input
            // id={`input-${id}`}
            className="peer h-8 w-full max-w-xl  ps-8 pe-2"
            placeholder={"Search"}
            type="search"
            value={"Search"}
            // onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon">
            <Bell />
          </Button> */}

          {/* right */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-1 w-8 h-8">
                <Avatar className="w-8 h-8">
                  {/* <AvatarImage src={user?.profilePicture} alt={user?.name} /> */}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {/* {user?.name?.charAt(0).toUpperCase()} */}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {/* <Link to="/user/profile">Profile</Link> */}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log Out</DropdownMenuItem>
              {/* <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
