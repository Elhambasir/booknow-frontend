// components/ui/ReusableDialog.tsx
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDirection } from "@radix-ui/react-direction";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ReusableDialogProps {
  trigger: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  scrollable?: boolean;
  className?: string;
}

export default function ReusableDialog({
  trigger,
  children,
  maxWidth = "sm:max-w-md",
  maxHeight = "max-h-[70vh]",
  footer,
  open,
  onOpenChange,
  scrollable = true,
  className,
}: ReusableDialogProps) {
  const direction = useDirection();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent 
        className={cn(
          maxWidth, 
          "grid grid-rows-[auto_1fr_auto] overflow-hidden",
          className
        )} 
        dir={direction}
      >
        {scrollable ? (
          <>
            {/* Content area with scroll */}
            <ScrollArea className={cn("px-1 mt-5 pr-5", maxHeight)}>
              <div className="space-y-4 p-1">{children}</div>
            </ScrollArea>
            
            {/* Footer (sticky at bottom) */}
            {footer && (
              <div className="sticky bottom-0 bg-background border-t pt-4 mt-4">
                {footer}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="space-y-4">{children}</div>
            {footer}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}