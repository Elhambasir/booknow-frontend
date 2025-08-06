"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
};

const TextField: React.FC<Props> = ({
  name,
  label,
  placeholder = "Enter your name",
  isRequired = false,
}) => {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              autoComplete="off"
              required={isRequired}
              placeholder={placeholder}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
