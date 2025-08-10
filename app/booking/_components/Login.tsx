"use client";

import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextField from "@/components/form/TextField";
import PasswordField from "@/components/form/PasswordField";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/bookingStore";
import { useSession } from "next-auth/react";
interface Props {
  handleNext: () => void;
}
const Login = ({ handleNext }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { booking, updateBooking } = useBookingStore();
  const { data: session } = useSession();
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
          toast.success("Login successful", {
            description: "Moving to the next step."
          });
          updateBooking({
            ...booking,
            user: {
              id: session?.user.id,
              email: session?.user.email,
            },
          });
          handleNext();
          return;
        }
      });
    });
  }

  return (
    <div className="min-h-fit bg-background">
      {/* Hero Section */}
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
            disabled={isPending}
          >
            {isPending ? "Moving on..." : "Sign In"}
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
