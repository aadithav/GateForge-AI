"use client";

import Link from "next/link";
import { CheckCircle2, ExternalLink, RefreshCcw, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlacementStore } from "@/store/placement-store";

const difficultyClass = {
  Easy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Hard: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export function DailyDsaEngine() {
  const { problems, generateDailyDsaSet, updateProblemStatus } =
    usePlacementStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Daily DSA engine</CardTitle>
          <p className="mt-2 text-sm text-slate-400">
            Generates 2 easy, 2 medium, and 1 hard problem from current study
            topic, weak areas, and progress level.
          </p>
        </div>
        <Button size="sm" onClick={generateDailyDsaSet}>
          <RefreshCcw className="h-3.5 w-3.5" />
          Generate
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={problem.link}
                  target="_blank"
                  className="flex items-center gap-2 font-medium text-white hover:text-cyan-200"
                >
                  {problem.name}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <Badge className={difficultyClass[problem.difficulty]}>
                  {problem.difficulty}
                </Badge>
                <Badge>{problem.topic}</Badge>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {problem.generatedReason}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                aria-label="Mark DSA problem solved"
                onClick={() => updateProblemStatus(problem.id, "solved")}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                aria-label="Skip DSA problem"
                onClick={() => updateProblemStatus(problem.id, "skipped")}
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
