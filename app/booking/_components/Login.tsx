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
import { useTransition, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/bookingStore";
import { useSession } from "next-auth/react";
import { authenticate } from "@/actions/auth";

interface Props {
  handleNext: () => void;
}

const Login = ({ handleNext }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { updateBooking } = useBookingStore();
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle session updates
  useEffect(() => {
    if (session?.user) {
      updateBooking({
        user: {
          id: session.user.id,
          email: session.user.email,
        },
      });
      handleNext();
    }
  }, [session]);
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
          const updatedSession = await getSession();
          await update(updatedSession);
          
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
  // async function onSubmit(values: z.infer<typeof LoginSchema>) {
  //   startTransition(async () => {      
  //     const response = await signIn("credentials", {
  //       identifier: values.identifier,
  //       password: values.password,
  //       redirect: false,
  //     });

  //     if (response?.error) {
  //       toast.error(response.error === "CredentialsSignin" 
  //         ? "Invalid credentials" 
  //         : "Login failed");
  //       return;
  //     }

  //     // Force session update
  //     const updatedSession = await getSession();
  //     await update(updatedSession);

  //     toast.success("Login successful", {
  //       description: "Moving to the next step."
  //     });
      
  //     // The useEffect will handle the rest when session updates
  //   });
  // }

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
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;