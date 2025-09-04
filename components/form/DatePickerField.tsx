"use client";

import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { format, startOfDay, subYears } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerFieldProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showYearDropdown?: boolean;
  yearRange?: number;
  placeholder?: string;
  className?: string;
};

export default function DatePickerField({
  name,
  label,
  isRequired = false,
  minDate = subYears(new Date(), 120), // Default: 120 years ago
  maxDate = new Date(), // Default: today
  disabledDates = [],
  showYearDropdown = true,
  yearRange = 100,
  placeholder = "Pick a date",
  className,
}: DatePickerFieldProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(value) => {
                     const dateOnly = format(value!, "yyyy-MM-dd");
                     field.onChange(dateOnly);
                  }}
                  disabled={(date) =>
                    date > maxDate ||
                    date < minDate ||
                    disabledDates.some(
                      (disabledDate) =>
                        startOfDay(disabledDate).getTime() ===
                        startOfDay(date).getTime()
                    )
                  }
                  fromYear={maxDate.getFullYear() - yearRange}
                  toYear={maxDate.getFullYear()}
                  captionLayout={
                    showYearDropdown ? "dropdown" : "dropdown-months"
                  }
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
