// lib/config/server.ts
import { z } from "zod";
import { sharedConfig } from "./shared";

// Define schema for server-only environment variables
// const serverSchema = z.object({
//   NEXTAUTH_SECRET: z.string(),
//   BOOK_NOW_BACKEND_TOKEN: z.string(),
//   NEXTAUTH_URL: z.url(),
// });

// Validate and parse
export const serverConfig = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    BOOK_NOW_BACKEND_TOKEN: process.env.BOOK_NOW_BACKEND_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  ...sharedConfig, // merged in
};

// Export with nice types
export type ServerConfig = typeof serverConfig;
