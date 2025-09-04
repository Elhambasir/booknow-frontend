"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RescheduleBooking } from "@/services/userService";
import { toast } from "sonner";
import {
  Clock,
  AlertCircle,
  XCircle,
  CheckCircle,
  HelpCircle,
  CalendarClock,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { BookingSelectInterface } from "@/types";
import DatePickerField from "@/components/form/DatePickerField";
import { TimePickerField } from "@/components/form/TimePickerField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { addYears, startOfToday } from "date-fns";
import { removeMilliseconds, to12HourFormat } from "@/lib/utils";

const RescheduleFormSchema = z.object({
  date: z.any(),
  time: z.string().min(1, "Pickup time is required"),
  return_date: z.any().optional(),
  return_time: z.string().optional(),
});

export default function RescheduleForm({
  booking,
  refetchBooking,
  onCancel,
}: {
  booking: BookingSelectInterface;
  refetchBooking: ()=> void;
  onCancel?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof RescheduleFormSchema>>({
    resolver: zodResolver(RescheduleFormSchema),
    defaultValues: {
      date: booking.date,
      time: booking.time,
      return_date: booking.return_date ?? undefined,
      return_time: booking.return_time ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof RescheduleFormSchema>) {
    const payload = {
      date: values.date,
      time: values.time + ":00.000",
      return_date: values.return_date ?? undefined,
      return_time: values.return_time
        ? values.return_time + ":00.000"
        : undefined,
    };
    startTransition(async () => {
      try {
        const response = await RescheduleBooking(
          payload,
          booking.documentId,
          session?.user.jwt
        );

        if ("status" in response && "statusText" in response) {
          throw new Error(response.message || "Reschedule Booking failed");
        }

        refetchBooking();
        toast.success("Booking rescheduled successfully", {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          description: "Your booking has been updated with the new timing",
        });

        // Call optional callback if provided
        if (onCancel) {
          onCancel();
        }
      } catch (error: any) {
        console.error("Reschedule error", error);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CalendarClock className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Reschedule Booking</h2>
      </div>

      {/* Current booking details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Current Booking Details</CardTitle>
          <CardDescription>Your original booking information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pickup Date:</span>
            <span className="font-medium">
              {new Date(booking.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pickup Time:</span>
            <span className="font-medium">{to12HourFormat(removeMilliseconds(booking.time))}</span>
          </div>
          {booking.type === "return" && booking.return_date && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return Date:</span>
                <span className="font-medium">
                  {new Date(booking.return_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return Time:</span>
                <span className="font-medium">{booking.return_time}</span>
              </div>
            </>
          )}
          <div className="flex justify-between pt-2 border-t">
            <span className="text-muted-foreground">Service Type:</span>
            <Badge variant="outline" className="capitalize">
              {booking.type}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Rescheduling Policy</AlertTitle>
        <AlertDescription className="text-blue-700">
          You can reschedule your booking up to 24 hours before your pickup
          time. Additional charges may apply for last-minute changes.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="flex items-center mb-4">
              <label className="text-lg font-semibold">Select New Timing</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-48">
                      Choose your preferred new date and time for your journey
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DatePickerField
                name="date"
                label="New Pickup Date"
                placeholder="Select new date"
                isRequired
                maxDate={addYears(new Date(), 1)}
                minDate={startOfToday()}
                yearRange={1}
              />
              <TimePickerField
                name="time"
                label="New Pickup Time"
                isRequired
                placeholder="Select new time"
              />
            </div>

            {booking.type === "return" && (
              <>
                <h3 className="text-md font-medium mt-6 mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Return Journey
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <DatePickerField
                    name="return_date"
                    label="New Return Date"
                    placeholder="Select return date"
                    isRequired
                    minDate={form.watch("date") || new Date()}
                  />
                  <TimePickerField
                    name="return_time"
                    label="New Return Time"
                    isRequired
                    placeholder="Select return time"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isPending || !form.watch("date") || !form.watch("time")}
            >
              {isPending ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Confirm Reschedule
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
