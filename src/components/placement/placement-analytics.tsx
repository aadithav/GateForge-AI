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
  difficultyDistribution,
  dsaSolvedOverTime,
  placementWeeklyPerformance,
} from "@/lib/placement-data";

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

export function PlacementAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="grid gap-6 xl:grid-cols-3">
        {["DSA solved over time", "Difficulty distribution", "Weekly performance"].map(
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
    <div className="grid gap-6 xl:grid-cols-3">
      <ChartShell title="DSA solved over time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dsaSolvedOverTime} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line dataKey="target" stroke="#64748b" strokeDasharray="4 4" dot={false} />
            <Line dataKey="solved" stroke="#22d3ee" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Difficulty distribution">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={difficultyDistribution} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis
              dataKey="difficulty"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="solved" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell title="Weekly performance">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={placementWeeklyPerformance} margin={{ left: -24, right: 8 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="planned" fill="#334155" radius={[4, 4, 0, 0]} />
            <Bar dataKey="solved" fill="#22d3ee" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}
