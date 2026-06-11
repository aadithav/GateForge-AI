import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[#E9ECEF] bg-[#F8F9FA] px-2 py-1 text-xs font-medium text-[#495057]",
        className,
      )}
      {...props}
    />
  );
}
