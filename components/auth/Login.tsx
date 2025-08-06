"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
const Login = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
      await signIn("credentials", {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      }).then((response) => {
        if (response?.error) {
          if (response?.error === "CredentialsSignin") {
            toast.error("Invalid credentials");
          }
          return;
        } else {
          toast.success("Login successful");
          return router.push("/profile");
        }
      });
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

      <Footer />
    </div>
  );
};

export default Login;
