"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { z } from "zod";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { firebaseAuth } from "@/lib/firebase/client";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type Values = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: Values) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(firebaseAuth, values.email);
      toast.success("Password reset email sent");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to send reset email";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Reset your password"
      description="Enter your email and we will send you reset instructions."
      backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(210_100%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(210_50%_15%),_transparent_55%)]"
      cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
      headerClassName="text-center"
      contentClassName="space-y-6"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send reset email"}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/auth/login" className="font-medium text-foreground hover:underline">
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
