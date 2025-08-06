// Dependencies: pnpm install @remixicon/react
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface RadioGroupWithIconFieldProps {
  name: string;
  label?: string;
  description?: string;
  options: {
    value: string;
    label: string;
    icon: React.ReactNode;
  }[];
}
export default function RadioGroupWithIconField({
  name,
  label,
  options,
  description,
}: RadioGroupWithIconFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full mt-[6px] gap-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              className="grid-cols-3"
              onValueChange={(e: any) => {
                field.onChange(e);
              }}
            >
              {/* Loop through options */}
              {options.map((option) => (
                <label
                  key={option.value}
                  className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                >
                  <RadioGroupItem
                    id={`radio-${name}-${option.value}`}
                    value={option.value}
                    className="sr-only after:absolute after:inset-0"
                    checked={field.value === option.value}
                  />
                  {option.icon}
                  <p className="text-xs font-medium leading-none text-foreground">
                    {option.label}
                  </p>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
