import Link from "next/link";
import { gateSubjects } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SubjectProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GATE subject progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {gateSubjects.slice(0, 7).map((subject) => (
          <Link
            key={subject.id}
            href={`/subjects/${subject.id}`}
            className="block rounded-md p-2 transition-colors hover:bg-slate-900"
          >
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-200">{subject.name}</span>
              <span className="text-slate-400">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
