"use client";

import { Clock } from "lucide-react";
import { InputHTMLAttributes, useRef } from "react";
import { Input } from "@/components/ui/input";

type TimePickerProps = {
  value?: string; // format "HH:MM"
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  minHour?: number;
  maxHour?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export default function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  label,
  className,
  minHour = 1,
  maxHour = 12,
  ...props
}: TimePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openTimePicker = () => {
    inputRef.current?.showPicker?.(); // Chrome/Edge/Safari support
    inputRef.current?.focus(); // fallback
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (!value) return;

    e.preventDefault(); // stop default looping behavior

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

    const newValue = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    onChange?.(newValue);
  };

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        className="relative cursor-pointer"
        onClick={openTimePicker} // whole area clickable
      >
        <Input
          ref={inputRef}
          type="time"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`peer pe-9 hide-time-icon ${className || ""}`}
          onWheel={handleWheel}
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 end-2 flex items-center justify-center pe-auto text-muted-foreground/80 peer-disabled:opacity-50">
          <Clock size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
