"use client";

import { toast } from "sonner";
import Link from "next/link";
import { LoginSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextField from "@/components/form/TextField";
import PasswordField from "@/components/form/PasswordField";
import { useTransition, useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/bookingStore";
import { useSession } from "next-auth/react";

interface Props {
  handleNext: () => void;
}

const Login = ({ handleNext }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { booking, updateBooking } = useBookingStore();
  const { data: session, update } = useSession();
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle session updates
  useEffect(() => {
    if (session?.user && isProcessingLogin) {
      updateBooking({
        user: {
          id: session.user.id,
          email: session.user.email,
        },
      });
      handleNext();
      setIsProcessingLogin(false);
    }
  }, [session, isProcessingLogin]);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(async () => {
      setIsProcessingLogin(true);
      
      const response = await signIn("credentials", {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        setIsProcessingLogin(false);
        toast.error(response.error === "CredentialsSignin" 
          ? "Invalid credentials" 
          : "Login failed");
        return;
      }

      // Force session update
      const updatedSession = await getSession();
      await update(updatedSession);

      toast.success("Login successful", {
        description: "Moving to the next step."
      });
      
      // The useEffect will handle the rest when session updates
    });
  }

  return (
    <div className="min-h-fit bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            name="identifier"
            label="Email/Username"
            placeholder="youremail@gmail.com"
          />
          <PasswordField name="password" label="Password" />
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold"
            disabled={isPending || isProcessingLogin}
          >
            {isPending || isProcessingLogin ? "Processing..." : "Sign In"}
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
    </div>
  );
};

export default Login;