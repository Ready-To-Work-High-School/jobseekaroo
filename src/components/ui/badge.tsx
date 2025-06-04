
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        amber: 
          "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        brandLight:
          "border-transparent bg-brand-100 text-brand-800 hover:bg-brand-200",
        brandSolid:
          "border-transparent bg-brand-500 text-white hover:bg-brand-600",
        success:
          "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        info:
          "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
        warning:
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-muted",
        premium:
          "border-transparent bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 font-bold shadow-sm",
        skyBlue:
          "border-transparent bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow-sm hover:from-sky-500 hover:to-blue-600",
        new:
          "border-transparent bg-brand-500 text-white hover:bg-brand-600 animate-pulse",
        gold:
          "border-transparent bg-gradient-to-r from-amber-300 to-amber-500 text-white hover:from-amber-400 hover:to-amber-600 shadow-sm"
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.625rem]",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse-slow",
        bounce: "animate-bounce",
        glow: "animate-glow-pulse"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    icon?: React.ReactNode;
}

function Badge({ className, variant, size, animation, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animation }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
