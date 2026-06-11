import Link from "next/link";
import { BrainCircuit, ShieldCheck } from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="hidden min-h-dvh w-72 shrink-0 border-r border-slate-800 bg-slate-950 px-4 py-5 lg:block">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400 text-slate-950">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            GateForge
          </p>
          <h1 className="text-lg font-semibold text-white">AI Study OS</h1>
        </div>
      </Link>

      <nav className="mt-8 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-900 hover:text-white",
                index === 0 && "bg-slate-900 text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
          <ShieldCheck className="h-4 w-4" />
          Senior mentor mode
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          No zero-output days. Missed work is converted into recovery blocks.
        </p>
      </div>
    </aside>
  );
}
