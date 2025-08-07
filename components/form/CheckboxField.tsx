"use client";

import React, { useId } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  name: string;
  label: string;
  subLabel?: string;
  description?: string;
  icon?: React.ReactNode;
};

const CheckboxField: React.FC<Props> = ({
  name,
  label,
  subLabel,
  description,
  icon,
}) => {
  const form = useFormContext();
  const id = useId();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
          <FormControl>
            <Checkbox
              id={id}
              className="order-1 after:absolute after:inset-0"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-describedby={`${id}-description`}
            />
          </FormControl>
          <div className="flex grow items-start gap-3">
            {icon}
            <div className="grid gap-2">
              <FormLabel htmlFor={id}>
                {label}
                {subLabel && (
                  <span className="text-muted-foreground text-sm leading-[inherit] font-normal ml-1">
                    {subLabel}
                  </span>
                )}
              </FormLabel>
              {description && (
                <FormDescription id={`${id}-description`}>
                  {description}
                </FormDescription>
              )}
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
