"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", study: 3, solved: 5 },
  { day: "Tue", study: 4.5, solved: 8 },
  { day: "Wed", study: 2, solved: 3 },
  { day: "Thu", study: 5, solved: 11 },
  { day: "Fri", study: 4, solved: 9 },
  { day: "Sat", study: 6, solved: 15 },
  { day: "Sun", study: 3.5, solved: 7 },
];

export function ProgressChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Card className="min-h-[360px]">
      <CardHeader>
        <CardTitle>Weekly execution curve</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: -20, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="study" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: 8,
                  color: "#e2e8f0",
                }}
              />
              <Area
                type="monotone"
                dataKey="study"
                stroke="#22d3ee"
                strokeWidth={2}
                fill="url(#study)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-md bg-slate-900/70" />
        )}
      </CardContent>
    </Card>
  );
}
