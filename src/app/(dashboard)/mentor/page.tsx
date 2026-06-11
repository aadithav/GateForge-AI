import { BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentorPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        AI Mentor
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Strict recommendations, recovery plans, project ideas, and resume output
        will expand here in the mentor module.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-cyan-300" />
            Current mentor instruction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-slate-300">
            Finish your DBMS revision and Algorithms PYQs today. Project
            recommendations unlock after a topic is marked complete.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
