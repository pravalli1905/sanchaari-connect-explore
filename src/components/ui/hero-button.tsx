import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300",
          variant === "primary" && "btn-hero",
          variant === "secondary" && "btn-secondary-transparent",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

HeroButton.displayName = "HeroButton"

export { HeroButton }