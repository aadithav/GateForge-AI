import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dailyDsaProblems } from "@/lib/placement-data";
import { placementTodayPlan, todayMission } from "@/lib/content-engine";

export function PlacementToday() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#606C38]">Placement</p>
              <CardTitle className="mt-2 text-2xl">Today&apos;s Placement Tasks</CardTitle>
            </div>
            <Badge>{placementTodayPlan.estimatedTime}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <TaskBlock
            title="Daily DSA"
            items={[
              `${todayMission.dailyDsa.easy} Easy`,
              `${todayMission.dailyDsa.medium} Medium`,
              `${todayMission.dailyDsa.hard} Hard`,
            ]}
          />
          <TaskBlock title="Core subject topic" items={[placementTodayPlan.coreSubjectTopic]} />
          <TaskBlock title="Interview questions" items={placementTodayPlan.interviewQuestions} />
          <TaskBlock title="Mini project" items={[placementTodayPlan.miniProject]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s DSA Set</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailyDsaProblems.map((problem) => (
            <div
              key={problem.id}
              className="flex flex-col gap-2 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-[#212529]">{problem.name}</p>
                <p className="mt-1 text-sm text-[#6C757D]">
                  {problem.topic} - {problem.difficulty}
                </p>
              </div>
              <Badge>{problem.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <CheckCircle2 className="h-4 w-4" />
          Mark Complete
        </Button>
      </div>
    </div>
  );
}

function TaskBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4">
      <p className="text-sm font-semibold text-[#212529]">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#6C757D]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
