import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-slate-950 px-4 py-8 text-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your study OS</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" />
          <p className="mt-4 text-sm text-slate-400">
            Already registered?{" "}
            <Link className="text-cyan-300" href="/login">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
