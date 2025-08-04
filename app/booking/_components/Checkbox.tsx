import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
interface Props {
    label: string;
    subLabel?: string;
    description: string;
    icon: React.ReactNode;
    onChange: (e: any)=> void;
    isChecked: boolean;
}
export default function CheckboxField({
    label,
    subLabel,
    description,
    icon,
    onChange,
    isChecked
}: Props) {
  const id = useId()
  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Checkbox
        id={id}
        className="order-1 after:absolute after:inset-0"
        aria-describedby={`${id}-description`}
        onCheckedChange={onChange}
        checked={isChecked}
      />
      <div className="flex grow items-start gap-3">
        {icon}
        <div className="grid gap-2">
          <Label htmlFor={id}>
            {label}{" "}
            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
              {subLabel?(subLabel): ''}
            </span>
          </Label>
          <p id={`${id}-description`} className="text-muted-foreground text-xs">
           {description}
          </p>
        </div>
      </div>
    </div>
  )
}
