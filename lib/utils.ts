import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/auth";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

// utils/timeUtils.ts

/**
 * Ensures the time string ends with ':00.000'
 * @param time - A time string, e.g., '15:25:00.000' or '12:25'
 * @returns Time string guaranteed to end with ':00.000'
 */
export function ensureMilliseconds(time: string): string {
  // If the string already ends with :00.000, return it
  if (time.endsWith(':00.000')) {
    return time;
  }

  // If it already has seconds but no milliseconds, add .000
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return `${time}.000`;
  }

  // If it has only hours and minutes, add :00.000
  if (/^\d{2}:\d{2}$/.test(time)) {
    return `${time}:00.000`;
  }

  // If format is unknown, just return original or handle as needed
  return time;
}
