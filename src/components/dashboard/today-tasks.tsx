"use client";

import { CheckCircle2, Clock3, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudyStore } from "@/store/study-store";

export function TodayTasks() {
  const { tasks, updateTaskStatus, regenerateSchedule, generateDailyPlan } =
    useStudyStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Today&apos;s generated tasks</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={generateDailyPlan}>
            <Sparkles className="h-3.5 w-3.5" />
            Generate
          </Button>
          <Button size="sm" variant="outline" onClick={regenerateSchedule}>
            <RotateCcw className="h-3.5 w-3.5" />
            Rebalance
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-medium text-white">{task.title}</h3>
                <Badge>{task.priority}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {task.subject} - {task.mode} - {task.status}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                {task.minutes} min due {task.dueDate}. {task.generatedReason}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                aria-label="Mark completed"
                onClick={() => updateTaskStatus(task.id, "completed")}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                aria-label="Mark missed"
                onClick={() => updateTaskStatus(task.id, "missed")}
              >
                <XCircle className="h-4 w-4 text-rose-300" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
