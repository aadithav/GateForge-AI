"use client";

import { CalendarClock, Wand2 } from "lucide-react";
import { TodayTasks } from "@/components/dashboard/today-tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudyStore } from "@/store/study-store";

export function DailyPlanner() {
  const { futureTasks, generateDailyPlan } = useStudyStore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-cyan-300" />
              Daily planner
            </CardTitle>
            <p className="mt-2 text-sm text-slate-400">
              The planner prioritizes revision debt, high-weightage weak topics,
              and placement DSA baseline work.
            </p>
          </div>
          <Button onClick={generateDailyPlan}>
            <Wand2 className="h-4 w-4" />
            Generate plan
          </Button>
        </CardHeader>
        {futureTasks.length > 0 && (
          <CardContent className="space-y-3">
            <p className="text-sm font-medium text-white">Future adjustments</p>
            {futureTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-md border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm text-cyan-100"
              >
                {task.title} <Badge className="ml-2">{task.dueDate}</Badge>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
      <TodayTasks />
    </div>
  );
}
