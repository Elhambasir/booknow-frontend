import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
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
                    const response = await fetch(`https://booknowapi.gmdirecthire.co.uk/api/auth/local`, {
                        method: "POST",
                        headers: {
                            'Content-type': "Application/json"
                        },
                        body: JSON.stringify({
                            identifier: identifier,
                            password: password
                        })
                    });
                    // Check if the response is valid
                    if (!response.ok) {
                        return null; // Authentication failed, return null
                    }
                    const res = await response.json();
                    // Authentication successful, return the user object and jwt
                    return {
                        id: res.user.id,
                        name: res.user.username,
                        email: res.user.email,
                        role: res.user.role,
                        first_name: res.user.first_name,
                        last_name: res.user.last_name,
                        jwt: res.jwt
                    };
                }
                
                // If validation fails or if credentials are not correct, return null
                return null;
            }
        })
    ]
} satisfies NextAuthConfig;