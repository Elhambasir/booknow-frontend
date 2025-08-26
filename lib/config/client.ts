// lib/config/client.ts
import { z } from "zod";
import { sharedConfig } from "./shared";
// Define schema for client-accessible env vars (must be prefixed NEXT_PUBLIC_)
const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_MAP_TOKEN: z.string(),
  NEXT_PUBLIC_COMPANY_PHONE: z.string(),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.email(),
});

export const clientConfig = {
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_DIRECTION_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAP_TOKEN: process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN,
  NEXT_PUBLIC_COMPANY_PHONE: process.env.NEXT_PUBLIC_COMPANY_PHONE,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  ...sharedConfig, // merged in
};

// Export with nice types
export type ClientConfig = typeof clientConfig;
