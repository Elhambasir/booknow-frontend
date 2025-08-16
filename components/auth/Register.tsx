"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EmailField from "../form/EmailField";
import PasswordField from "../form/PasswordField";
import TextField from "../form/TextField";
import { RegisterSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getStrapiURL } from "@/lib/get-strapi-url";
const Register = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const strapiUrl = getStrapiURL();
  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(async () => {
      try {
        const response = await fetch(
          `${strapiUrl}/api/auth/local/register`,
          {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password,
            }),
          }
        );

        const res = await response.json();
        if (!response.ok) {
          if (res.error.status === 400) {
            toast.error("Registration failed", {
              description: res.error.message,
            });
            return;
          }
          toast.error("Something went wrong");
          return;
        }
        toast.success("Signed up successfully", {
          description: res.message||"Email sent"
        });
        router.push(`/auth/email-confirmation?email=${values.email}`);
      } catch (error: any) {
        console.error("Signup error", error);
        if (error.response && error.response.status === 400) {
          // Try to extract a more specific error message if available
          const apiMessage = error.response.data?.message;
          if (
            Array.isArray(apiMessage) &&
            apiMessage[0]?.messages?.[0]?.message
          ) {
            toast.error(apiMessage[0].messages[0].message);
          } else if (typeof apiMessage === "string") {
            toast.error(apiMessage);
          } else {
            toast.error("Invalid input or user already exists.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.error("error", error);
        return;
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Create Your Account
                </CardTitle>
                <p className="text-muted-foreground">
                  Join us for seamless booking experience and exclusive benefits
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <TextField name="username" label="Username" />
                    <EmailField
                      name="email"
                      label="Email"
                      placeholder="youremail@gmail.com"
                    />
                    <PasswordField name="password" label="Password" />
                    <PasswordField
                      name="confirmPassword"
                      label="Confrim Password"
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold"
                      disabled={isPending}
                    >
                      {isPending ? "Signing Up..." : "Sign Up"}
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
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline font-semibold"
                    >
                      Sign in here
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

export default Register;
