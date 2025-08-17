// app/actions.ts (Server Action)
"use server";
import { revalidatePath } from "next/cache";

export async function revalidateMyPath(path: string) {
  revalidatePath(path, "page"); // Revalidate a specific path
}