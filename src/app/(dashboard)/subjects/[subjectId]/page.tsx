import { notFound } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicCompletionAction } from "@/components/mentor/topic-completion-action";
import { Progress } from "@/components/ui/progress";
import { gateSubjects } from "@/lib/constants";

type SubjectPageProps = {
  params: Promise<{ subjectId: string }>;
};

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = await params;
  const subject = gateSubjects.find((item) => item.id === subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge>{subject.weightage}</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {subject.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Difficulty: {subject.difficulty}. Estimated completion time:{" "}
            {subject.estimatedHours} hours. Finish notes, formulas, PYQs, and
            all three revision loops before marking a topic complete.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <Progress value={subject.progress} />
          <p className="mt-2 text-sm text-slate-400">{subject.progress}% done</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {subject.topics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle>{topic.name}</CardTitle>
                  <p className="mt-2 text-sm text-slate-400">
                    {topic.estimatedHours} hours - {topic.weightage} weightage
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{topic.difficulty}</Badge>
                  <Badge>{topic.progress}% done</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">Topics and subtopics</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topic.subtopics.map((subtopic) => (
                    <Badge key={subtopic}>{subtopic}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-white">Notes</p>
                <ul className="mt-2 space-y-1 text-slate-400">
                  {topic.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-white">Formulas</p>
                <ul className="mt-2 space-y-1 text-slate-400">
                  {topic.formulas.map((formula) => (
                    <li key={formula}>{formula}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-white">PYQs</p>
                <ul className="mt-2 space-y-1 text-slate-400">
                  {topic.pyqs.map((pyq) => (
                    <li key={pyq}>{pyq}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-white">Resources</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topic.resources.map((resource) => (
                    <Badge key={resource}>{resource}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium text-white">Revision checklist</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {Object.entries(topic.revisionChecklist).map(
                    ([stage, complete]) => (
                      <div
                        key={stage}
                        className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 px-3 py-2"
                      >
                        {complete ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-500" />
                        )}
                        <span className="capitalize text-slate-300">
                          {stage} revision
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <Progress value={topic.progress} />
              <div className="flex justify-end">
                <TopicCompletionAction
                  subject={subject.name}
                  topic={topic.name}
                  missedTasks={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
