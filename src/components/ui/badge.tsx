import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-2 text-muted",
        resonance: "border-resonance/30 bg-resonance/10 text-resonance",
        veto: "border-veto/30 bg-veto/10 text-veto",
        warn: "border-warn/30 bg-warn/10 text-warn",
        fg: "border-border-strong bg-fg/10 text-fg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
