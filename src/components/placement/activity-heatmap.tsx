import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityHeatmap } from "@/lib/placement-data";
import { cn } from "@/lib/utils";

function intensity(count: number) {
  if (count === 0) return "bg-slate-900";
  if (count <= 2) return "bg-cyan-950";
  if (count <= 4) return "bg-cyan-700";
  if (count <= 6) return "bg-cyan-400";
  return "bg-white";
}

export function ActivityHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily activity heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {activityHeatmap.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} solved`}
              className={cn(
                "aspect-square rounded-sm border border-slate-800",
                intensity(day.count),
              )}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 2, 4, 6, 8].map((value) => (
              <span
                key={value}
                className={cn(
                  "h-3 w-3 rounded-sm border border-slate-800",
                  intensity(value),
                )}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
