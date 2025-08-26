// lib/config/shared.ts
import { z } from "zod";

const sharedSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
});

export const sharedConfig = sharedSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

export type SharedConfig = typeof sharedConfig;
