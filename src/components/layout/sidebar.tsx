import Link from "next/link";
import { BookOpenCheck, ShieldCheck } from "lucide-react";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="hidden min-h-dvh w-72 shrink-0 border-r border-[#E9ECEF] bg-white px-4 py-5 lg:block">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#606C38] text-white">
          <BookOpenCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#606C38]">
            GateForge
          </p>
          <h1 className="text-lg font-semibold text-[#212529]">Deep Focus OS</h1>
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
                "text-[#495057] hover:bg-[#F8F9FA] hover:text-[#212529]",
                index === 0 && "bg-[#F8F9FA] text-[#606C38]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#606C38]">
          <ShieldCheck className="h-4 w-4" />
          Today-first mode
        </div>
        <p className="mt-2 text-sm leading-6 text-[#6C757D]">
          Open the app, see today&apos;s work, finish it calmly.
        </p>
      </div>
    </aside>
  );
}
