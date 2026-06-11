"use client";

import { ArrowRight, CheckCircle2, Clock, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { todayMission } from "@/lib/content-engine";
import { useRoadmapStore } from "@/store/roadmap-store";
import type { MissionKind } from "@/types/content";

export function TodaysMission() {
  const completed = useRoadmapStore((state) => state.completedMissionItems);
  const toggleMissionItem = useRoadmapStore((state) => state.toggleMissionItem);
  const advanceTomorrow = useRoadmapStore((state) => state.advanceTomorrow);
  const doneCount = todayMission.items.filter((item) => completed[item.id]).length;
  const allRequiredDone = todayMission.items
    .filter((item) => !item.optional)
    .every((item) => completed[item.id]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#606C38]">{todayMission.dateLabel}</p>
            <CardTitle className="mt-2 text-2xl">Today&apos;s Mission</CardTitle>
          </div>
          <Badge>
            <Clock className="mr-1 h-3.5 w-3.5" />
            {todayMission.totalEstimate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-[#6C757D]">
          Finish these. Nothing else matters today.
        </p>
        <div className="space-y-3">
          {todayMission.items.map((item) => (
            <MissionCheckbox
              key={item.id}
              id={item.id}
              checked={completed[item.id]}
              label={item.label}
              title={item.title}
              context={item.context}
              estimate={item.estimate}
              optional={item.optional}
              onToggle={toggleMissionItem}
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-[#E9ECEF] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6C757D]">
            {doneCount}/{todayMission.items.length} complete
          </p>
          <Button onClick={advanceTomorrow} disabled={!allRequiredDone}>
            {allRequiredDone ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
            {allRequiredDone ? "Show Tomorrow's Work" : "Complete Required Tasks"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MissionCheckbox({
  id,
  checked,
  label,
  title,
  context,
  estimate,
  optional,
  onToggle,
}: {
  id: MissionKind;
  checked: boolean;
  label: string;
  title: string;
  context: string;
  estimate: string;
  optional?: boolean;
  onToggle: (id: MissionKind) => void;
}) {
  return (
    <label className="flex cursor-pointer gap-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4 transition-colors hover:bg-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        className="mt-1 h-4 w-4 accent-[#606C38]"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6C757D]">
            {label}
          </p>
          {optional && <Badge>Only if unlocked</Badge>}
          <Badge>{estimate}</Badge>
        </div>
        <p className="mt-2 font-medium text-[#212529]">{title}</p>
        <p className="mt-1 text-sm text-[#6C757D]">{context}</p>
      </div>
    </label>
  );
}
