"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const fullName = String(formData.get("fullName") || "");
    const supabase = createClient();

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
          });

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {mode === "signup" && (
        <Input name="fullName" type="text" placeholder="Full name" required />
      )}
      <Input name="email" type="email" placeholder="student@example.com" required />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        minLength={8}
        required
      />
      {error && (
        <p className="rounded-md border border-rose-400/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-100">
          {error}
        </p>
      )}
      <Button className="w-full" type="submit" disabled={loading}>
        {loading
          ? "Working..."
          : mode === "login"
            ? "Continue"
            : "Start building discipline"}
      </Button>
    </form>
  );
}
