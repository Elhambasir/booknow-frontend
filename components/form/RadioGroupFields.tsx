"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type ItemProps = {
  id: number;
  value: string;
  label: string;
  Icon: React.ReactNode;
  disabled?: boolean;
  description: string;
};

type Props = {
  items: ItemProps[];
  name: string;
  label?: string;
};

const RadioGroupField = ({ items, name, label: text }: Props) => {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <RadioGroup
          value={field.value}
          onValueChange={(value) => field.onChange(value)}
          className="grid grid-cols-2 gap-3 w-full"
        >
          {text && (
            <Label htmlFor={name} className="col-span-2">
              {text}
            </Label>
          )}
          {items.map((item) => (
            <label
              key={item.id}
              className="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5 w-full"
            >
              <div className="flex justify-between gap-2 w-full">
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem
                    disabled={item.disabled}
                    id={item.id.toString()}
                    value={item.value}
                    className=""
                  />

                  <Label
                    htmlFor={item.id.toString()}
                    className={cn(item.disabled ? "text-zinc-500" : "")}
                  >
                    {item.label}
                  </Label>
                </div>
                {item.Icon}
              </div>
              <p className={cn(item.disabled ? "text-zinc-500" : "")}>
                {item.description}
              </p>
            </label>
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioGroupField;
