"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/lib/validationSchema";
import { getStrapiURL } from "@/lib/get-strapi-url";
type ActionResult =
  | {
      type: "success";
      title: string;
      description: string;
    }
  | {
      type: "error";
      title: string;
      description: string;
    }
  | {
      type: "email_not_confirmed";
      title: string;
      description: string;
      email: string;
    };

const DEFAULT_ERROR = {
  type: "error" as const,
  title: "Error",
  description: "Something went wrong. Please try again.",
};

export async function authenticate(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  try {
    // Validate form data
    const validatedFields = LoginSchema.safeParse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        type: "error",
        title: "Validation Error",
        description: "Invalid email or password format",
      };
    }

    const { identifier, password } = validatedFields.data;
    const strapiUrl = getStrapiURL();
    // Authenticate with Strapi API
    const strapiResponse = await fetch(
      `${strapiUrl}/api/auth/local`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      }
    );

    const strapiData = await strapiResponse.json();
    if (!strapiResponse.ok) {
      // Handle email not confirmed case
      if (
        strapiResponse.status === 400 &&
        strapiData.error?.message === "Your account email is not confirmed"
      ) {
        return {
          type: "email_not_confirmed",
          title: "Email Not Confirmed",
          description: "Please confirm your email address before logging in",
          email: identifier,
        };
      }
      // Handle other Strapi errors
      return {
        type: "error",
        title: "Authentication failed",
        description: strapiData.error?.message || "Incorrect email or password",
      };
    }

    // Proceed with NextAuth sign-in
    const signInResult = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      return {
        type: "error",
        title: "Authentication Error",
        description: 
          signInResult.error === "CredentialsSignin"
            ? "Invalid credentials"
            : "Something went wrong during sign in",
      };
    }
    return {
      type: "success",
      title: "Success",
      description: "Login successful",
    };

  } catch (error) {
    console.error("Authentication error:", error);
    
    if (error instanceof AuthError) {
      return {
        type: "error",
        title: "Authentication Error",
        description: "Invalid credentials",
      };
    }

    return DEFAULT_ERROR;
  }
}