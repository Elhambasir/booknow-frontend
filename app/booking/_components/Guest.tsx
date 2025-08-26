"use client";
import React from "react";
import { useTransition } from "react";
import SelectField from "@/components/form/SelectField";
import DatePickerField from "@/components/form/DatePickerField"; // using your provided one
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestSchema } from "@/lib/validationSchema";
import { toast } from "sonner";
import TextField from "@/components/form/TextField";
import EmailField from "@/components/form/EmailField";
import PhoneNumberField from "@/components/form/PhoneNumberField";
import { fetchAPI, FetchAPIOptions } from "@/lib/api-wrapper";
import { clientConfig } from "@/lib/config";
import { useBookingStore } from "@/store/bookingStore";
type GuesFormValues = z.infer<typeof GuestSchema>;
interface Props {
  handleNext: () => void;
}
export default function Guest({ handleNext }: Props) {
  const [isPending, startTransition] = useTransition();
  const { updateBooking } = useBookingStore();
  const form = useForm<GuesFormValues>({
    resolver: zodResolver(GuestSchema),
    defaultValues: {
      username: undefined,
      gender: undefined,
      birth_date: undefined,
      phone_number: undefined,
      email: undefined,
      first_name: undefined,
      last_name: undefined,
    },
  });

  const onSubmit = (values: GuesFormValues) => {
    startTransition(async () => {
      try {
        const strapiUrl = clientConfig.NEXT_PUBLIC_API_URL;
        const options: FetchAPIOptions = {
          method: "POST",
          body: {
            data: {
              ...values,
            },
          },
        };
        const response = await fetchAPI(
          `${strapiUrl}/api/user-details/post-user`,
          options
        );
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Update failed");
        }
        updateBooking({
          user: {
            ...response,
          },
        });
        toast.success("Sucessfull:", {
          description: "Moving to next step...",
        });
        handleNext();
        return;
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
              toast.error("Invalid input or user already exists.");
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <TextField
              name="username"
              label="Username"
              placeholder="Enter username"
              isRequired={true}
            />
          </div>
          <div className="space-y-2">
            <EmailField
              label="Email"
              name="email"
              placeholder="example@gmail.com"
              isRequired={true}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <TextField
              name="first_name"
              label="First Name"
              placeholder="Enter first name"
              isRequired={true}
            />
          </div>
          <div className="space-y-2">
            <TextField
              name="last_name"
              label="Last Name"
              placeholder="Enter last name"
              isRequired={true}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <PhoneNumberField
              label="Phone Number"
              name="phone_number"
              placeholder="Enter phone number"
              isRequired={true}
            />
          </div>
          <div className="space-y-2">
            <DatePickerField
              label="Date of Birth"
              name="birth_date"
              isRequired={true}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <SelectField
              label="Gender"
              name="gender"
              isRequired={true}
              placeholder="Select Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={
            isPending ||
            !form.watch("username") ||
            !form.watch("email") ||
            !form.watch("first_name") ||
            !form.watch("last_name") ||
            !form.watch("phone_number") ||
            !form.watch("birth_date") ||
            !form.watch("gender")
          }
          className="w-full"
          size="lg"
        >
          {isPending ? "Saving..." : "Continue as Guest"}
        </Button>
      </form>
    </Form>
  );
}
