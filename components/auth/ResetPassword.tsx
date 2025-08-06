"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResetPasswordSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useTransition } from "react";
import { Button } from "../ui/button";
import TextField from "../form/TextField";
import PasswordField from "../form/PasswordField";
import { useSearchParams } from "next/navigation";
import OTPField from "../form/OTPField";
const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Form setup
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            otp: values.otp,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.message || "Failed to reset password");
          return;
        }

        toast.success("Password reset successful. You can now log in.");
        router.push("/auth/login");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong, please try again.");
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Reset Password
                </CardTitle>
                <p className="text-muted-foreground">
                  Enter the OTP sent to "{email}" and set your new password.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <OTPField
                      name="otp"
                      label="OTP Code"
                    />
                    <PasswordField
                      name="password"
                      label="New Password"
                      placeholder="Enter new password"
                    />
                    <PasswordField
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Re-enter new password"
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? "Resetting..." : "Reset Password"}
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center">
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-semibold"
                  >
                    Back to Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResetPassword;
