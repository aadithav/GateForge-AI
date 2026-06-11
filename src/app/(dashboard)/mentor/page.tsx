import { Coffee, Clock, Code2, FolderKanban, GraduationCap, Repeat } from "lucide-react";
import { TodaysMission } from "@/components/focus/todays-mission";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placementTodayPlan, todayMission } from "@/lib/content-engine";

export default function MentorPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#F8F9FA] text-[#606C38]">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#606C38]">Good Morning.</p>
              <CardTitle className="mt-1 text-2xl">Today&apos;s briefing</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="max-w-3xl text-sm leading-6 text-[#6C757D]">
            Do not negotiate with the whole syllabus today. Finish the mission
            below. Tomorrow&apos;s work will appear after today is complete.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <BriefingItem icon={GraduationCap} label="GATE Topic" value={todayMission.gateTopic} />
            <BriefingItem icon={Code2} label="Placement Topic" value={todayMission.placementTopic} />
            <BriefingItem icon={Repeat} label="Revision Topic" value={todayMission.revisionTopic} />
            <BriefingItem
              icon={FolderKanban}
              label="Mini Project"
              value={todayMission.miniProject ?? placementTodayPlan.miniProject}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <Clock className="mr-1 h-3.5 w-3.5" />
              Estimated time: {todayMission.estimatedStudyTime}
            </Badge>
            <Badge>
              Daily DSA: {todayMission.dailyDsa.easy}E / {todayMission.dailyDsa.medium}M /{" "}
              {todayMission.dailyDsa.hard}H
            </Badge>
          </div>
          <Button>Start Today&apos;s Work</Button>
        </CardContent>
      </Card>
      <TodaysMission />
    </div>
  );
}

function BriefingItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#606C38]" />
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6C757D]">{label}</p>
        <p className="mt-1 text-sm font-medium text-[#212529]">{value}</p>
      </div>
    </div>
  );
}
