import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { gateSubjects } from "@/lib/constants";

export default function SubjectsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Subject command center
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Every subject tracks notes, formulas, PYQs, weightage, resources, and
          topic progress.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {gateSubjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <Link key={subject.id} href={`/subjects/${subject.id}`}>
              <Card className="h-full transition-colors hover:border-cyan-400/40 hover:bg-slate-900/70">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{subject.name}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge>{subject.weightage}</Badge>
                    <Badge>{subject.difficulty}</Badge>
                  </div>
                  <Progress value={subject.progress} />
                  <p className="mt-2 text-sm text-slate-400">
                    {subject.progress}% completed
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
