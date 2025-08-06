// Dependencies: pnpm install input-otp lucide-react react-hook-form

"use client";

import { Label } from "@/components/ui/label";
import { OTPInput, SlotProps } from "input-otp";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Minus } from "lucide-react";

type OTPFieldProps = {
  name: string;
  label: string;
};

export default function OTPField({ name, label }: OTPFieldProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Label>{label}</Label>
          </FormLabel>
          <FormControl>
            <div className="space-y-2 flex justify-center w-full">
              <OTPInput
                {...field}
                containerClassName="flex items-center gap-3"
                maxLength={6}
                render={({ slots }) => (
                  <>
                    <div className="flex">
                      {slots.slice(0, 3).map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>

                    <div className="text-muted-foreground/80">
                      <Minus size={16} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div className="flex">
                      {slots.slice(3).map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>
                  </>
                )}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={`relative flex size-9 items-center justify-center border-y border-e border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 ring-offset-background transition-all first:rounded-s-lg first:border-s last:rounded-e-lg ${
        props.isActive
          ? "z-10 border border-ring ring-2 ring-ring/30 ring-offset-2"
          : ""
      }`}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
