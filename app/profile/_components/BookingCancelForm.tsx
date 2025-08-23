"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cancelBooking } from "@/lib/user";
import { revalidateMyPath } from "@/actions/revalidatePath";
import { toast } from "sonner";
import TextareaField from "@/components/form/TextareaField";
import { AlertCircle, XCircle, CheckCircle, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
const BookingCancelFormSchema = z.object({
  reason: z
    .string()
    .min(3, { message: "Reason must be at least 3 characters" })
    .max(225, { message: "Reason cannot exceed 225 characters" }),
});

// Common cancellation reasons for quick selection
const commonReasons = [
  "Change of plans",
  "Found alternative transportation",
  "Unexpected schedule conflict",
  "Price concerns",
  "Other reason",
];

export default function BookingCancelForm({
  id,
  onCancel,
}: {
  id: string;
  onCancel?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof BookingCancelFormSchema>>({
    resolver: zodResolver(BookingCancelFormSchema),
    defaultValues: {
      reason: "",
    },
  });

  function onSubmit(values: z.infer<typeof BookingCancelFormSchema>) {
    startTransition(async () => {
      try {
        const response = await cancelBooking(
          id,
          values.reason,
          session?.user.jwt
        );

        if ("status" in response && "statusText" in response) {
          throw new Error(response.message || "Cancel Booking failed");
        }

        await revalidateMyPath(`/profile`);
        toast.success("Booking cancelled successfully", {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        });

        // Call optional callback if provided
        if (onCancel) {
          onCancel();
        }
      } catch (error: any) {
        console.error("Cancel error", error);

        if (error instanceof Error) {
          toast.error(error.message || "An unexpected error occurred", {
            icon: <XCircle className="h-5 w-5 text-red-500" />,
          });
        } else if (typeof error === "object" && error !== null) {
          if ("message" in error) {
            const apiMessage = error.message;
            if (
              Array.isArray(apiMessage) &&
              apiMessage[0]?.messages?.[0]?.message
            ) {
              toast.error(apiMessage[0].messages[0].message, {
                icon: <XCircle className="h-5 w-5 text-red-500" />,
              });
            } else if (typeof apiMessage === "string") {
              toast.error(apiMessage, {
                icon: <XCircle className="h-5 w-5 text-red-500" />,
              });
            } else {
              toast.error("Invalid input or user already exists.", {
                icon: <XCircle className="h-5 w-5 text-red-500" />,
              });
            }
          } else {
            toast.error("An unexpected error occurred.", {
              icon: <XCircle className="h-5 w-5 text-red-500" />,
            });
          }
        } else {
          toast.error("An unexpected error occurred.", {
            icon: <XCircle className="h-5 w-5 text-red-500" />,
          });
        }
      }
    });
  }

  const handleQuickReasonSelect = (reason: string) => {
    if (reason === "Other reason") {
      form.setValue("reason", "");
      form.clearErrors("reason");
    } else {
      form.setValue("reason", reason);
      form.clearErrors("reason");
    }
  };

  return (
    <div className="space-y-5">
      <Alert variant="destructive" className="mb-4 mt-5">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Cancelling a booking may be subject to our cancellation policy. Please
          review terms before proceeding.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div className="flex items-center mb-2">
              <label className="text-sm font-medium">
                Why are you cancelling this booking?
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-48">
                      Providing a reason helps us improve our service
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {commonReasons.map((reason) => (
                <Button
                  key={reason}
                  type="button"
                  variant={
                    form.watch("reason") === reason ? "secondary" : "outline"
                  }
                  size="sm"
                  className="h-9 text-xs justify-start truncate"
                  onClick={() => handleQuickReasonSelect(reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>

            <TextareaField
              name="reason"
              label="Please provide details (required)"
              placeholder="Tell us more about why you need to cancel..."
            />

            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                {form.watch("reason")?.length || 0}/225 characters
              </span>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <Button
              type="submit"
              variant="destructive"
              className="flex-1 text-white"
              disabled={isPending || !form.watch("reason")}
            >
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Cancelling...
                </>
              ) : (
                "Confirm Cancellation"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
