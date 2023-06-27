import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { X } from "lucide-react";
import * as React from "react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => {
  return (
    <DialogPrimitive.Portal className={clsx(className)} {...props}>
      <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        {children}
      </div>
    </DialogPrimitive.Portal>
  );
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={clsx(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});

const DialogClose = ({
  className,
  ...props
}: DialogPrimitive.DialogCloseProps) => {
  return (
    <DialogPrimitive.Close
      {...props}
      className="absolute right-8 top-6 opacity-70 transition-opacity hover:opacity-100"
    >
      <X className={className} />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={className} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export { Dialog, DialogTrigger, DialogContent, DialogClose };
