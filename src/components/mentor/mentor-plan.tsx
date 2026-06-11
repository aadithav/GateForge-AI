"use client";

import Link from "next/link";
import {
  BrainCircuit,
  CalendarClock,
  Code2,
  ExternalLink,
  FileText,
  FolderGit2,
  Send,
  ListChecks,
  Rocket,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMentorStore } from "@/store/mentor-store";

function TextBlock({ text }: { text: string }) {
  return (
    <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-md border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-300">
      {text}
    </pre>
  );
}

export function MentorPlan() {
  const recommendation = useMentorStore((state) => state.activeRecommendation);
  const history = useMentorStore((state) => state.history);

  return (
    <div className="space-y-6">
      <Card className="border-rose-400/20 bg-rose-950/20">
        <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <BrainCircuit className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
            <div>
              <p className="font-medium text-white">
                {recommendation.subject} - {recommendation.topic}
              </p>
              <p className="mt-1 text-sm leading-6 text-rose-100">
                {recommendation.verdict}
              </p>
            </div>
          </div>
          <Badge className="w-fit border-rose-400/30 bg-rose-400/10 text-rose-100">
            Strict senior mentor mode
          </Badge>
        </CardContent>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-cyan-300" />
              Revision schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border border-slate-800 bg-slate-900/50 p-3">
              Tomorrow: {recommendation.revision.tomorrow}
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900/50 p-3">
              After 7 days: {recommendation.revision.after7Days}
            </div>
            <div className="rounded-md border border-slate-800 bg-slate-900/50 p-3">
              After 30 days: {recommendation.revision.after30Days}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-cyan-300" />
              DSA recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendation.dsa.map((problem) => (
              <div
                key={problem.name}
                className="rounded-md border border-slate-800 bg-slate-900/50 p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={problem.link}
                    target="_blank"
                    className="flex items-center gap-2 font-medium text-white hover:text-cyan-200"
                  >
                    {problem.name}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <Badge>{problem.difficulty}</Badge>
                  <Badge>{problem.topic}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">{problem.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-cyan-300" />
              Project recommendation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-lg font-semibold text-white">
                {recommendation.project.title}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{recommendation.project.difficulty}</Badge>
                {recommendation.project.techStack.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-white">Folder structure</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {recommendation.project.folderStructure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Features</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {recommendation.project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Stretch goals</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {recommendation.project.stretchGoals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-cyan-300" />
              GitHub plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="font-medium text-white">Repository structure</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {recommendation.github.repositoryStructure.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-white">Commit milestones</p>
              <ul className="mt-2 space-y-1 text-slate-400">
                {recommendation.github.commitMilestones.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-medium text-white">README.md</p>
              <TextBlock text={recommendation.github.readme} />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-300" />
              Resume bullets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-6 text-slate-300">
              {recommendation.resumeBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-cyan-300" />
              LinkedIn post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextBlock text={recommendation.linkedinPost} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-rose-300" />
              Recovery and next topic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-white">Next topic</p>
              <p className="mt-2 text-sm text-slate-400">
                {recommendation.nextTopic}
              </p>
            </div>
            <div>
              <p className="font-medium text-white">Recovery plan</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-400">
                {recommendation.recoveryPlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-cyan-300" />
            Mentor history
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {history.map((item) => (
            <div
              key={`${item.id}-${item.createdAt}`}
              className="rounded-md border border-slate-800 bg-slate-900/50 p-3"
            >
              <p className="font-medium text-white">
                {item.subject} - {item.topic}
              </p>
              <p className="mt-2 text-sm text-slate-400">{item.project.title}</p>
              <div className="mt-3">
                <Progress value={item.analytics.projectProgress} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
