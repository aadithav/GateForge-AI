"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Dot, LockKeyhole } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRoadmapStore } from "@/store/roadmap-store";
import type { RoadmapStatus } from "@/types/content";

export function GateSubjectTree() {
  const subjects = useRoadmapStore((state) => state.subjects);

  return (
    <Card>
      <CardHeader>
        <CardTitle>GATE Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.id}>
            <Link
              href={`/subjects/${subject.id}`}
              className="block rounded-md px-2 py-2 text-sm font-medium text-[#212529] hover:bg-[#F8F9FA]"
            >
              <div className="flex items-center justify-between gap-2">
                <span>{subject.name}</span>
                <span className="text-xs text-[#6C757D]">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="mt-2 h-1.5" />
            </Link>
            <div className="ml-4 border-l border-[#E9ECEF] pl-3">
              {subject.topics.map((topic) => (
                <p
                  key={topic.id}
                  className="flex items-center gap-2 py-1 text-sm text-[#6C757D]"
                >
                  <StatusIcon status={topic.status} />
                  {topic.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function StatusIcon({ status }: { status: RoadmapStatus }) {
  if (status === "completed") {
    return <CheckCircle2 className="h-3.5 w-3.5 text-[#606C38]" />;
  }
  if (status === "current") {
    return <Circle className="h-3.5 w-3.5 text-[#4A90E2]" />;
  }
  if (status === "locked") {
    return <LockKeyhole className="h-3.5 w-3.5 text-[#ADB5BD]" />;
  }
  return <Dot className="h-4 w-4 text-[#6C757D]" />;
}
