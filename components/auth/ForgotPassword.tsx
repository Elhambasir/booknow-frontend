"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForgotPasswordSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useTransition } from "react";
import { Button } from "../ui/button";
import EmailField from "../form/EmailField";
import { getStrapiURL } from "@/lib/get-strapi-url";
const ForgotPassword = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const strapiUrl = getStrapiURL();
  // Form setup
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(async () => {
      try {
        // Call your forgot-password API endpoint
        const res = await fetch(`${strapiUrl}/api/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data?.error.message || "Something went wrong");
          return;
        }

        toast.success(
          "If an account exists with that email, you’ll receive an OTP code shortly."
        );
        router.push(`/auth/password/reset-password?email=${values.email}`);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong, please try again.");
      }
    });
  }

  return (
    <div className="min-h-fit bg-background">
      {/* Hero Section */}
      <section className="relative py-20 mt-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Forgot Password
                </CardTitle>
                <p className="text-muted-foreground">
                  Enter your email address and we’ll send you a code.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <EmailField
                      name="email"
                      label="Email"
                      placeholder="youremail@gmail.com"
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send OTP code"}
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
    </div>
  );
};

export default ForgotPassword;
