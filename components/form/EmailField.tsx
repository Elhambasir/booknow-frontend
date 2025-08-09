// Dependencies: pnpm install lucide-react

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
};

export default function EmailField({
  name,
  label,
  isRequired = false,
  placeholder,
}: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}{" "}
          </FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...field}
                  id="input-10"
                  className="peer pe-9"
                  placeholder={placeholder ? placeholder : "Email"}
                  type="email"
                  value={field.value || ""}
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Mail size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
