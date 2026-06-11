"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMentorStore } from "@/store/mentor-store";

export function MentorDashboardCard() {
  const recommendation = useMentorStore((state) => state.activeRecommendation);

  return (
    <Card className="border-cyan-400/20 bg-cyan-400/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-cyan-300" />
          AI mentor directive
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-cyan-50">{recommendation.verdict}</p>
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-200">Project progress</span>
            <span className="text-slate-400">
              {recommendation.analytics.projectProgress}%
            </span>
          </div>
          <Progress value={recommendation.analytics.projectProgress} />
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/mentor">
            Open mentor plan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
