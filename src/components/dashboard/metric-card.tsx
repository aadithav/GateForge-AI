import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, hint, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {value}
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-900 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">{hint}</p>
      </CardContent>
    </Card>
  );
}
