import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dailyDsaProblems } from "@/lib/placement-data";
import { placementTracks, projectUnlocks, todayMission } from "@/lib/content-engine";

export function PlacementRoadmap() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Placement Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <RoadmapTask title="Daily DSA" value={todayMission.items[2].title} />
          <RoadmapTask title="Core subject" value={todayMission.items[1].title} />
          <RoadmapTask title="Interview preparation" value="Explain one project clearly in 2 minutes" />
          <RoadmapTask title="Mini project" value={todayMission.items[4].title} optional />
          <Button className="mt-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark Complete
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Placement Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {placementTracks.map((track) => (
            <div key={track.id}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[#212529]">{track.name}</span>
                <span className="text-[#6C757D]">{track.progress}%</span>
              </div>
              <Progress value={track.progress} />
              <p className="mt-2 text-sm text-[#6C757D]">
                Current: {track.current}. Next: {track.next}.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project unlocks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {projectUnlocks.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-[#212529]">{project.title}</p>
                <Badge>{project.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-[#6C757D]">{project.requirement}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s DSA set</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {dailyDsaProblems.map((problem) => (
            <RoadmapTask
              key={problem.id}
              title={problem.difficulty}
              value={`${problem.name} - ${problem.topic}`}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function RoadmapTask({
  title,
  value,
  optional,
}: {
  title: string;
  value: string;
  optional?: boolean;
}) {
  return (
    <label className="flex gap-3 rounded-lg border border-[#E9ECEF] bg-[#F8F9FA] p-4">
      <input type="checkbox" className="mt-1 h-4 w-4 accent-[#606C38]" />
      <span>
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#6C757D]">
          {title} {optional ? "(if unlocked)" : ""}
        </span>
        <span className="mt-1 block text-sm font-medium text-[#212529]">{value}</span>
      </span>
    </label>
  );
}
