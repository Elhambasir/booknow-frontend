"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailField from "@/components/form/EmailField";
import PasswordField from "@/components/form/PasswordField";
import TextField from "@/components/form/TextField";
import { RegisterSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getStrapiURL } from "@/lib/get-strapi-url";
import { useBookingStore } from "@/store/bookingStore";
interface Props {
  handleNext: ()=> void;
}
const Register = ({handleNext}: Props) => {
  const [isPending, startTransition] = useTransition();
  const { updateBooking } = useBookingStore();
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
        const strapiUrl = getStrapiURL();

        const response = await fetch(`${strapiUrl}/api/auth/local/register`, {
          method: "POST",
          headers: {
              "Content-type": "Application/json"
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password,
          }),
        });
        const res = await response.json();
        if (!response.ok) {
          toast.error(`Error:`, {
            description: res.error.message??"Something went wrong",
          });
          return;
        }
        updateBooking({
          user: {
            id: res.user.id,
            email: res.user.email,
          },
        });
        toast.success("Sucessfull:", {
          description: "Moving to next step...",
        });
        handleNext();
        return;
      } catch (error) {
        console.error("Something went wrong", error);
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <div className="min-h-fit bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField name="username" label="Username" />
          <EmailField
            name="email"
            label="Email"
            placeholder="youremail@gmail.com"
          />
          <PasswordField name="password" label="Password" />
          <PasswordField name="confirmPassword" label="Confrim Password" />
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
    </div>
  );
};

export default Register;
