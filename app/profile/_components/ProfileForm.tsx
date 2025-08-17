"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser, createUserDetails, updateUserDetails } from "@/lib/user";
import { useSession } from "next-auth/react";
import { revalidateMyPath } from "@/actions/revalidatePath";
const UserProfileFormSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must be at least 3 characters" })
    .max(20, { error: "Username cannot exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  email: z.email(),

  first_name: z
    .string()
    .min(1, "Required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, {
      message: "First name can only contain letters",
    }),

  last_name: z
    .string()
    .min(1, "required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name can only contain letters",
    }),

  phone_number: z.string().regex(/^\+?[0-9\s\-]+$/, {
    message: "Please enter a valid phone number",
  }),

  gender: z.string().min(1, "Required"),

  birth_date: z
    .date()
    .max(new Date(), {
      message: "Birth date cannot be in the future",
    })
    .refine(
      (date) => {
        const ageDiff = Date.now() - date.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age >= 13;
      },
      {
        message: "You must be at least 13 years old",
      }
    ),
});

import { User, Edit3 } from "lucide-react";
import { toast } from "sonner";
import TextField from "@/components/form/TextField";
import EmailField from "@/components/form/EmailField";
import PhoneNumberField from "@/components/form/PhoneNumberField";
import SelectField from "@/components/form/SelectField";
import DatePickerField from "@/components/form/DatePickerField";
import { UserDetails } from "@/types";
type Props = { userDetails: UserDetails };

function ProfileForm({ userDetails }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const userDetail = userDetails.user_detail;
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserProfileFormSchema>>({
    resolver: zodResolver(UserProfileFormSchema),
    defaultValues: {
      username: userDetails.username ?? undefined,
      first_name: userDetails.first_name ?? undefined,
      last_name: userDetails.last_name ?? undefined,
      email: userDetails.email ?? undefined,
      phone_number: userDetail?.phone_number ?? undefined,
      gender: userDetail?.gender ?? undefined,
      birth_date: userDetail?.birth_date?new Date(userDetail?.birth_date) ?? undefined: undefined,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserProfileFormSchema>) {
    startTransition(async () => {
      try {
        const response = await updateUser(
          {
            username: values.username,
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
          },
          session?.user.id,
          session?.user.jwt
        );
        // Check if the response contains an error status
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Update failed");
        }
        if (userDetail?.documentId) {
          const updateUserDetailsResponse = await updateUserDetails(
            {
              phone_number: values.phone_number,
              birth_date: values.birth_date,
              gender: values.gender,
            },
            userDetail?.documentId,
            session?.user.jwt
          );
          if (
            "status" in updateUserDetailsResponse &&
            "statusText" in updateUserDetailsResponse
          ) {
            // This handles non-OK responses that returned a status object
            throw new Error(
              updateUserDetailsResponse.message || "Update user details failed"
            );
          }
        } else {
          debugger;
          const createUserDetailsResponse = await createUserDetails(
            {
              phone_number: values.phone_number,
              birth_date: values.birth_date,
              gender: values.gender,
              user: Number(session?.user.id),
            },
            session?.user.jwt
          );

          if (
            "status" in createUserDetailsResponse &&
            "statusText" in createUserDetailsResponse
          ) {
            // This handles non-OK responses that returned a status object
            throw new Error(
              createUserDetailsResponse.message || "Create user details failed"
            );
          }
        }
        await revalidateMyPath(`/profile`);
        toast.success("Update seccuessfull");
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
  }

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
    setIsEditing(false);
  };
  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span>Personal Information</span>
            </CardTitle>
            <Button
              disabled={isPending}
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="transition-all duration-200"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                {isEditing ? (
                  <TextField name="username" label="Username" isRequired />
                ) : (
                  <Input
                    value={userDetails.username??""}
                    disabled
                    className="capitalize"
                  />
                )}
                {isEditing ? (
                  <EmailField
                    name="email"
                    label="Email"
                    placeholder="youremail@gmail.com"
                    isRequired
                  />
                ) : (
                  <Input
                    value={userDetails.email??""}
                    disabled
                    className="capitalize"
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {isEditing ? (
                  <TextField name="first_name" label="First Name" isRequired />
                ) : (
                  <Input
                    value={userDetails.first_name??""}
                    disabled
                    className="capitalize"
                  />
                )}
                {isEditing ? (
                  <TextField name="last_name" label="Last Name" isRequired />
                ) : (
                  <Input
                    value={userDetails.last_name??""}
                    disabled
                    className="capitalize"
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {isEditing ? (
                  <DatePickerField
                    name="birth_date"
                    label="Date of Birth"
                    isRequired
                  />
                ) : (
                  <Input
                    value={userDetail?.birth_date.toString()??""}
                    disabled
                    className="capitalize"
                  />
                )}
                {isEditing ? (
                  <PhoneNumberField
                    label="Phone Number"
                    name="phone_number"
                    isRequired
                  />
                ) : (
                  <Input
                    value={userDetail?.phone_number??""}
                    disabled
                    className="capitalize"
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {isEditing ? (
                  <SelectField
                    label="Gender"
                    name="gender"
                    placeholder="Selcet Gender"
                    isRequired
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                  />
                ) : (
                  <Input
                    value={userDetail?.gender??""}
                    disabled
                    className="capitalize"
                  />
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileForm;
