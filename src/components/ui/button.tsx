import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex rounded-full items-center justify-center whitespace-nowrap rounded text-base font-mono font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2 rounded-full',
        icon: 'h-10 w-10 rounded-full',
        lg: 'h-11 px-8 rounded-full',
        sm: 'h-9 px-3 rounded-full',
      },
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-secondary text-white hover:bg-primary',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        'secondary-ghost': 'px-0 py-0 text-secondary bg-none underline-offset-4 hover:underline',
        'primary-ghost': 'px-0 py-0 text-primary bg-none underline-offset-4 hover:underline',
        outline: 'border border-muted bg-none',
        'outline-primary': 'border border-primary bg-none hover:bg-primary text-white',
        'outline-secondary': 'border border-secondary bg-none hover:bg-secondary text-white',
        link: 'text-foreground items-start justify-start underline-offset-4 hover:underline',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
