"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  gateSubjects,
  studyHoursData,
  weeklyPerformanceData,
} from "@/lib/constants";

function ChartShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="min-h-[340px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">{children}</CardContent>
    </Card>
  );
}

const tooltipStyle = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: 8,
  color: "#e2e8f0",
};

export function StudyAnalytics() {
  const [mounted, setMounted] = useState(false);
  const subjectData = gateSubjects.map((subject) => ({
    subject: subject.name.replace("Engineering ", "Eng. ").replace("Computer ", "Comp. "),
    progress: subject.progress,
  }));

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="grid gap-6 xl:grid-cols-2">
        {["Study hours", "Subject completion", "Weekly performance"].map(
          (title) => (
            <ChartShell key={title} title={title}>
              <div className="h-full rounded-md bg-slate-900/70" />
            </ChartShell>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ChartShell title="Study hours">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={studyHoursData} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line dataKey="target" stroke="#64748b" strokeDasharray="4 4" dot={false} />
            <Line dataKey="hours" stroke="#22d3ee" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Subject completion">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={subjectData} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis
              dataKey="subject"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="progress" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Weekly performance">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyPerformanceData} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="planned" fill="#334155" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}
