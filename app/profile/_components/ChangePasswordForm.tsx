"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { ChangePasswordSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useTransition, Suspense } from "react";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/form/PasswordField";
import { ChangeMyPassword } from "@/services/authService";
import { signOut, useSession } from "next-auth/react";
function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const { data:session } = useSession();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: undefined,
      currentPassword: undefined,
      passwordConfirmation: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
    startTransition(async () => {
      try {
        const response = await ChangeMyPassword(
          values.currentPassword,
          values.password,
          values.passwordConfirmation,
          session?.user.jwt
        );
        // Check if the response contains an error status
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Password change failed");
        }
        toast.success(
          response?.message || "Password updated seccuessfully. Please login with new password"
        );
        signOut();
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
    <Card className="!border-0 bg-white/95 backdrop-blur-sm mt-5">
      <CardHeader className="text-center space-y-4 pb-3">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Change Password
        </CardTitle>
        {/* <p className="text-muted-foreground">
          Enter the OTP sent to "{email}" and set your new password.
        </p> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PasswordField
              name="currentPassword"
              label="Current Password"
              placeholder="Enter current password"
            />
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
              {isPending ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const ChangePassword = () => {
  return (
    <div className="w-full mx-auto">
      <Suspense
        fallback={
          <Card className="!border-0 bg-white/95 backdrop-blur-sm">
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
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
};

export default ChangePassword;
