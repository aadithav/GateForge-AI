"use client";

import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudyStore } from "@/store/study-store";

const stageLabel = {
  first: "First revision",
  second: "Second revision",
  third: "Third revision",
};

export function RevisionSystem() {
  const { revisions, revisionStatus, regenerateSchedule } = useStudyStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Spaced revision system</CardTitle>
          <p className="mt-2 text-sm text-slate-400">{revisionStatus}</p>
        </div>
        <Button size="sm" variant="outline" onClick={regenerateSchedule}>
          <RotateCcw className="h-3.5 w-3.5" />
          Rebalance
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {revisions.map((revision) => (
          <div
            key={revision.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex gap-3">
              {revision.status === "completed" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 text-cyan-300" />
              )}
              <div>
                <p className="font-medium text-white">{revision.topic}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {revision.subject} - {stageLabel[revision.stage]} - due{" "}
                  {revision.dueDate}
                </p>
              </div>
            </div>
            <Badge>{revision.spacingDays}-day gap</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
