import * as React from "react";
import { cn } from "@/app/lib/utils/cnUtils";

type MaxWidth = "xs" | "sm" | "md" | "lg" | "xl";

export function Container({
  children,
  maxWidth = "lg",
  className,
}: {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
}) {
  const maxWidthClasses: Record<MaxWidth, string> = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}
