"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextField from "../form/TextField";
import PasswordField from "../form/PasswordField";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { authenticate } from "@/actions/auth";
import { useSession } from "next-auth/react";
const Login = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("identifier", values.identifier);
      formData.append("password", values.password);

      const result = await authenticate(undefined, formData);

      if (result.type === "success") {
        toast.success(result.title, {
          description: result.description,
        });
        await update();
        router.push("/profile");
      } else if (result.type === "email_not_confirmed") {
        toast.error(result.title, {
          description: result.description,
        });
      } else if (result.type === "error") {
        toast.error(result.title, {
          description: result.description,
        });
      }
    });
  }

  return (
    <div className="min-h-fit bg-background">
      {/* Hero Section */}
      <section className="relative py-20 mt-5 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <p className="text-muted-foreground">
                  Sign in to your account to manage bookings and preferences
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <TextField
                      name="identifier"
                      label="Email/Username"
                      placeholder="youremail@gmail.com"
                    />
                    <PasswordField name="password" label="Password" />
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center">
                  <p className="text-muted-foreground">
                    Forgot your password?{" "}
                    <Link
                      href="/auth/password/forgot-password"
                      className="text-primary hover:underline font-semibold"
                    >
                      Reset it
                    </Link>
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="text-primary hover:underline font-semibold"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>

                <div className="mt-3 text-center">
                  <Link
                    href="/booking"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Continue as guest booking
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

export default Login;
