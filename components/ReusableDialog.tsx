// components/ui/ReusableDialog.tsx
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDirection } from "@radix-ui/react-direction";

interface ReusableDialogProps {
  trigger: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ReusableDialog({
  trigger,
  children,
  maxWidth = "sm:max-w-md",
  footer,
  open,
  onOpenChange,
}: ReusableDialogProps) {
  const direction = useDirection();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={maxWidth} dir={direction}>
        <div className="space-y-4">{children}</div>

        {footer}
      </DialogContent>
    </Dialog>
  );
}
