import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
};
export default function TextareaField({
  name,
  label,
  placeholder = "Enter your message",
}: Props) {
  const form = useFormContext();
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Label htmlFor={name}>{label}</Label>
          </FormLabel>
          <FormControl>
            <Textarea {...field} id={name} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
