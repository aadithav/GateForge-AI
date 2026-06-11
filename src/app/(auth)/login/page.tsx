import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-cyan-400 text-slate-950">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <CardTitle>Log in to GateForge AI</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" />
          <p className="mt-4 text-sm text-slate-400">
            New here?{" "}
            <Link className="text-cyan-300" href="/signup">
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
