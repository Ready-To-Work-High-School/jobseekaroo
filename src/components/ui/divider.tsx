
import * as React from "react"
import { cn } from "@/lib/utils"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "presentation" : "separator"}
      aria-orientation="horizontal"
      className={cn("relative my-8", className)}
      {...props}
    >
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-200 dark:border-slate-700" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {props.children}
        </span>
      </div>
    </div>
  )
)

Divider.displayName = "Divider"

export { Divider }
