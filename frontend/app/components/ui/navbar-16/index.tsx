'use client';

import * as React from 'react';
import { SparklesIcon, UploadIcon } from 'lucide-react';
import AppToggle from './AppToggle';
import TeamSwitcher from './TeamSwitcher';
import { Button } from '@repo/shadcn-ui/components/ui/button';
import { cn } from '@repo/shadcn-ui/lib/utils';

// Types
export interface Navbar16Props extends React.HTMLAttributes<HTMLElement> {
  teams?: string[];
  defaultTeam?: string;
  currentApp?: string;
  apps?: Array<{
    id: string;
    name: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  exportButtonText?: string;
  upgradeButtonText?: string;
  onTeamChange?: (team: string) => void;
  onAppChange?: (appId: string) => void;
  onExportClick?: () => void;
  onUpgradeClick?: () => void;
}

// Default teams
const defaultTeams = ['shadcn/ui', 'Acme Inc.', 'Origin UI'];

export const Navbar16 = React.forwardRef<HTMLElement, Navbar16Props>(
  (
    {
      className,
      teams = defaultTeams,
      defaultTeam = teams[0],
      currentApp = 'dashboard',
      apps,
      exportButtonText = 'Export',
      upgradeButtonText = 'Upgrade',
      onTeamChange,
      onAppChange,
      onExportClick,
      onUpgradeClick,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          'border-b px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            <TeamSwitcher 
              teams={teams} 
              defaultTeam={defaultTeam} 
              onTeamChange={onTeamChange}
            />
          </div>
          {/* Middle area */}
          <AppToggle 
            apps={apps}
            currentApp={currentApp}
            onAppChange={onAppChange}
          />
          {/* Right side */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-sm max-sm:aspect-square max-sm:p-0"
              onClick={(e) => {
                e.preventDefault();
                if (onExportClick) onExportClick();
              }}
            >
              <UploadIcon
                className="opacity-60 sm:-ms-1"
                size={16}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">{exportButtonText}</span>
            </Button>
            <Button 
              size="sm" 
              className="text-sm max-sm:aspect-square max-sm:p-0"
              onClick={(e) => {
                e.preventDefault();
                if (onUpgradeClick) onUpgradeClick();
              }}
            >
              <SparklesIcon
                className="opacity-60 sm:-ms-1"
                size={16}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">{upgradeButtonText}</span>
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Navbar16.displayName = 'Navbar16';

export { AppToggle, TeamSwitcher };