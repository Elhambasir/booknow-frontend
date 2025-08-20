"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmailConfirmationSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useTransition, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import OTPField from "@/components/form/OTPField";
import { useSearchParams } from "next/navigation";
import { ConfirmEmail, SendOtp } from "@/lib/auth";
import { useBookingStore } from "@/store/bookingStore";

function EmailConfirmationForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const source = searchParams.get("source");
  const { currentStep, setCurrentStep } = useBookingStore();

  const [isPending, startTransition] = useTransition();
  const [isResending, startResending] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof EmailConfirmationSchema>>({
    resolver: zodResolver(EmailConfirmationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof EmailConfirmationSchema>) => {
    startTransition(async () => {
      try {
        const response = await ConfirmEmail(values.otp);
        // Check if the response contains an error status
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Email confirmation failed");
        }
        toast.success(response?.message || "Email confirmed seccuessfull");
        if (source && source === "booking") {
          handleNext();
          router.push("/booking");
          return;
        }
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
  };
  const handleNext = () => {
    if (currentStep) {
        setCurrentStep(currentStep + 1);
    }
  };
  const handleResendCode = useCallback(() => {
    if (!email) {
      toast.error("No email address found");
      return;
    }

    startResending(async () => {
      try {
        const response = await SendOtp(email);
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Failed to send code");
        }

        toast.success(
          response.message || "Verification code has been resent successfully"
        );
      } catch (error: any) {
        console.error("Send code error", error);

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
  }, [email]);

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4 pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Confirm Email
        </CardTitle>
        <p className="text-muted-foreground">
          Enter the OTP sent to "{email}" and confirm your email.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <OTPField name="otp" label="OTP Code" />
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isPending}
            >
              {isPending ? "Confirming..." : "Confirm"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex gap-5 justify-between flex-wrap text-center">
          {!source&&(
            <Link
            href="/auth/login"
            className="text-primary hover:underline font-semibold"
          >
            Back to Login
          </Link>
          )}
          <Button
            variant="link"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-secondary hover:underline p-0 h-auto"
          >
            {isResending ? "Sending..." : "Send Code Again"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const EmailConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-background">
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
                      Confirm Email
                    </CardTitle>
                    <p className="text-muted-foreground">Loading...</p>
                  </CardHeader>
                </Card>
              }
            >
              <EmailConfirmationForm />
            </Suspense>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EmailConfirmationPage;
