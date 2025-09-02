'use client';

import * as React from 'react';
import { LayoutGridIcon } from 'lucide-react';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/shadcn-ui/components/ui/dropdown-menu';

export interface AppOption {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface AppToggleProps {
  apps?: AppOption[];
  currentApp?: string;
  onAppChange?: (appId: string) => void;
  className?: string;
}

const defaultApps: AppOption[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Analytics and insights',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Manage your projects',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Schedule and events',
  },
  {
    id: 'tasks',
    name: 'Tasks',
    description: 'Track your tasks',
  },
  {
    id: 'messages',
    name: 'Messages',
    description: 'Team communications',
  },
  {
    id: 'files',
    name: 'Files',
    description: 'Document management',
  },
];

export const AppToggle = React.forwardRef<
  HTMLButtonElement,
  AppToggleProps
>(({ apps = defaultApps, currentApp = 'dashboard', onAppChange, className }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Switch application"
        >
          <LayoutGridIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64">
        <DropdownMenuLabel>Switch Application</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-2 gap-1 p-1">
          {apps.map((app) => (
            <DropdownMenuItem
              key={app.id}
              className="flex flex-col items-start p-3 cursor-pointer h-auto"
              onClick={() => {
                if (onAppChange) {
                  onAppChange(app.id);
                }
              }}
            >
              <div className="flex items-center gap-2 w-full">
                {app.icon && (
                  <div className="flex-shrink-0">
                    {app.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">
                    {app.name}
                  </p>
                  {app.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {app.description}
                    </p>
                  )}
                </div>
              </div>
              {app.id === currentApp && (
                <div className="w-full mt-2">
                  <div className="h-1 bg-primary rounded-full w-full" />
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

AppToggle.displayName = 'AppToggle';

export default AppToggle;