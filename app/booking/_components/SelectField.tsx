import { useId } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  label: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  onChange: (e: any) => void;
  value: string;
}

export default function SelectField({
  label,
  options,
  placeholder = "Select an option",
  onChange,
  value,
}: Props) {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select onValueChange={onChange} value={value || ""}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-full">
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value ? option.value.toString() : ""}
            >
              {option.value} {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
