"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { z } from "zod";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { firebaseAuth } from "@/lib/firebase/client";

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function AuthActionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [email, setEmail] = useState<string | null>(null);
    const [isValidCode, setIsValidCode] = useState(false);

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    // Verify the password reset code when component mounts
    useEffect(() => {
        async function verifyCode() {
            if (mode !== "resetPassword" || !oobCode) {
                setIsVerifying(false);
                setIsValidCode(false);
                return;
            }

            try {
                // Verify the code and get the email
                const email = await verifyPasswordResetCode(firebaseAuth, oobCode);
                setEmail(email);
                setIsValidCode(true);
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Invalid or expired reset link";
                toast.error(message);
                setIsValidCode(false);
            } finally {
                setIsVerifying(false);
            }
        }

        verifyCode();
    }, [mode, oobCode]);

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!oobCode) {
            toast.error("Invalid reset link");
            return;
        }

        try {
            setIsLoading(true);
            await confirmPasswordReset(firebaseAuth, oobCode, values.password);
            toast.success("Password reset successfully");
            // Redirect to login after a short delay
            setTimeout(() => {
                router.push("/auth/login");
            }, 2000);
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Unable to reset password. The link may have expired.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading state while verifying code
    if (isVerifying) {
        return (
            <AuthShell
                title="Verifying reset link"
                description="Please wait while we verify your password reset link."
                backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(210_100%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(210_50%_15%),_transparent_55%)]"
                cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
                headerClassName="text-center"
                contentClassName="space-y-6"
            >
                <div className="flex items-center justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
            </AuthShell>
        );
    }

    // Show error if invalid code or wrong mode
    if (!isValidCode || mode !== "resetPassword") {
        return (
            <AuthShell
                title="Invalid reset link"
                description="This password reset link is invalid or has expired."
                backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(210_100%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(210_50%_15%),_transparent_55%)]"
                cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
                headerClassName="text-center"
                contentClassName="space-y-6"
            >
                <div className="space-y-4 text-sm text-muted-foreground">
                    <p className="text-center">
                        Please request a new password reset link to continue.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/auth/forgot-password">Request new reset link</Link>
                    </Button>
                    <div className="text-center">
                        <Link href="/auth/login" className="text-sm text-foreground hover:underline">
                            Back to sign in
                        </Link>
                    </div>
                </div>
            </AuthShell>
        );
    }

    // Show password reset form
    return (
        <AuthShell
            title="Reset your password"
            description={email ? `Enter a new password for ${email}` : "Enter your new password"}
            backgroundClassName="bg-[radial-gradient(circle_at_top,_hsl(210_100%_95%),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(210_50%_15%),_transparent_55%)]"
            cardClassName="border-border/60 shadow-xl bg-card/95 backdrop-blur-sm"
            headerClassName="text-center"
            contentClassName="space-y-6"
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your new password"
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        {...form.register("confirmPassword")}
                    />
                    {form.formState.errors.confirmPassword && (
                        <p className="text-xs text-destructive">
                            {form.formState.errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Resetting password..." : "Reset password"}
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
