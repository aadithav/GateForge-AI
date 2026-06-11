import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
        className,
      )}
      {...props}
    />
  );
}
