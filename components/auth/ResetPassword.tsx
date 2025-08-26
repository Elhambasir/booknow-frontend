"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResetPasswordSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useTransition, Suspense } from "react";
import { Button } from "../ui/button";
import PasswordField from "../form/PasswordField";
import { useSearchParams } from "next/navigation";
import OTPField from "../form/OTPField";
import { ResetMyPassword } from "@/services/authService";
function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      code: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    startTransition(async () => {
      try {
        const response = await ResetMyPassword(
          values.code,
          values.password,
          values.passwordConfirmation
        );
        // Check if the response contains an error status
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Password reset failed");
        }
        toast.success(
          response?.message || "Your password updated seccuessfully"
        );
        router.push("/auth/login");
      } catch (error: any) {
        console.error("Update error", error);

        if (error instanceof Error) {
          // Handle errors thrown by fetchAPI
          toast.error(error.message || "An unexpected error occurred");
        } else if (typeof error === "object" && error !== null) {
          // Handle the case where the API returned an error object
          if ("message" in error) {
            // Try to extract a more specific error message if available
            const apiMessage = error.message;
            if (
              Array.isArray(apiMessage) &&
              apiMessage[0]?.messages?.[0]?.message
            ) {
              toast.error(apiMessage[0].messages[0].message);
            } else if (typeof apiMessage === "string") {
              toast.error(apiMessage);
            } else {
              toast.error("Something went wrong");
            }
          } else {
            toast.error("An unexpected error occurred.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    });
  }
  return (
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <OTPField name="code" label="OTP Code" />
            <PasswordField
              name="password"
              label="New Password"
              placeholder="Enter new password"
            />
            <PasswordField
              name="passwordConfirmation"
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
  );
}

const PasswordReset = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Suspense
              fallback={
                <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center space-y-4 pb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Reset Password
                    </CardTitle>
                    <p className="text-muted-foreground">Loading...</p>
                  </CardHeader>
                </Card>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordReset;
