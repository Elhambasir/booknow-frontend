"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import EmailField from "@/components/form/EmailField";
import TextField from "@/components/form/TextField";
import { ContactFormSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { getStrapiURL } from "@/lib/get-strapi-url";
import { fetchAPI, FetchAPIOptions } from "@/lib/api-wrapper";
import TextareaField from "@/components/form/TextareaField";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      phone: undefined,
      description: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    startTransition(async () => {
      try {
        const strapiUrl = getStrapiURL();
        const options: FetchAPIOptions = {
          method: "POST",
          body: {
            data: {
              ...values,
            },
          },
        };
        const response = await fetchAPI(`${strapiUrl}/api/messages`, options);
        if ("status" in response && "statusText" in response) {
          // This handles non-OK responses that returned a status object
          throw new Error(response.message || "Sending message failed");
        }

        toast.success("Sucessfull:", {
          description: "Your message sent",
        });
        form.reset({
          name: "",
          email: "",
          phone: "",
          description: "",
        });
        return;
      } catch (error: any) {
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
              toast.error("Something went wrong.");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <TextField name="name" label="Name" />
            <EmailField
              name="email"
              label="Email"
              placeholder="youremail@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <TextField name="phone" label="Phone" />
            <TextareaField name="description" label="Message" />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
