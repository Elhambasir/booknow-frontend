import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/validationSchema";
import { getStrapiURL } from "./lib/get-strapi-url";
export default {
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { identifier, password } = validatedFields.data;
          const strapiUrl = getStrapiURL();
          try {
            const response = await fetch(
              `${strapiUrl}/api/auth/local`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
              }
            );

            const res = await response.json();
            if (!response.ok) {
              // Handle specific email not confirmed error
              return null;
            }

            return {
              id: res.user.id,
              name: res.user.username,
              email: res.user.email,
              role: res.user.role,
              first_name: res.user.first_name,
              last_name: res.user.last_name,
              jwt: res.jwt,
              confirmed: res.user.confirmed, // Make sure this is included
            };
          } catch (error) {
            // Forward the error message to the client
            if (error instanceof Error) {
              throw error;
            }
            throw new Error("Authentication failed");
          }
        }

        // If validation fails or if credentials are not correct, return null
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
