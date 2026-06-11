import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GateForge AI",
  description:
    "A strict AI study operating system for GATE CS 2027 and placements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-slate-950">{children}</body>
    </html>
  );
}
