"use client";

import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes, useRef } from "react";

type TimePickerFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  minHour?: number;
  maxHour?: number;
  isRequired?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type">;

export function TimePickerField({
  name,
  label,
  placeholder = "Select time",
  minHour = 1,
  maxHour = 12,
  isRequired = false,
  ...props
}: TimePickerFieldProps) {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const openTimePicker = () => {
    inputRef.current?.showPicker?.(); // Modern browsers
    inputRef.current?.focus();
  };

  const handleWheel = (
    e: React.WheelEvent<HTMLInputElement>,
    value: string | undefined,
    onChange: (value: string) => void
  ) => {
    if (!value) return;

    e.preventDefault();

    let [hours, minutes] = value.split(":").map((n) => parseInt(n, 10));

    if (e.deltaY < 0) {
      // Scroll up
      if (hours < maxHour) {
        hours++;
      }
    } else {
      // Scroll down
      if (hours > minHour) {
        hours--;
      }
    }

    const newValue = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    onChange(newValue);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>{" "}
          <FormControl>
            <div className="relative cursor-pointer" onClick={openTimePicker}>
              <Input
                ref={inputRef}
                type="time"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={placeholder}
                className="peer pe-9 hide-time-icon"
                required={isRequired}
                onWheel={(e) => handleWheel(e, field.value, field.onChange)}
                {...props}
              />
              <div className="pointer-events-none absolute inset-y-0 end-2 flex items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
                <Clock size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
