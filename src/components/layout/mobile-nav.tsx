"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur lg:hidden">
      <Link href="/dashboard" className="text-sm font-semibold text-white">
        GateForge AI
      </Link>
      <details className="relative">
        <summary className="list-none">
          <Button size="icon" variant="outline" aria-label="Open navigation">
            <Menu className="h-4 w-4" />
          </Button>
        </summary>
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-800 bg-slate-950 p-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </details>
    </div>
  );
}
