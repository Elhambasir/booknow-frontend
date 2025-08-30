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

/**
 * Removes milliseconds from a time string with validation
 * @param timeString - The time string to process
 * @returns The time string without milliseconds, or original string if invalid format
 */
export function removeMilliseconds(timeString: string): string {
  if (!timeString || typeof timeString !== 'string') {
    return timeString;
  }
  
  // Split by colon to check time format
  const parts = timeString.split(':');
  
  // Valid time formats should have 2-3 parts (HH:MM or HH:MM:SS)
  if (parts.length < 2 || parts.length > 3) {
    return timeString;
  }
  
  // Check if the last part contains milliseconds
  const lastPart = parts[parts.length - 1];
  if (lastPart.includes('.')) {
    const [seconds] = lastPart.split('.');
    parts[parts.length - 1] = seconds;
    return parts.join(':');
  }
  
  return timeString;
}