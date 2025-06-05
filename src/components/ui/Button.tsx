'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-accent-gold text-white hover:bg-accent-gold/90',
        secondary: 'bg-accent-rose text-white hover:bg-accent-rose/90',
        outline: 'border border-accent-gold text-accent-gold hover:bg-accent-gold/10',
        ghost: 'text-text-primary hover:bg-background-secondary',
        link: 'text-accent-gold underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, fullWidth, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonClasses = buttonVariants({ variant, size, fullWidth, className });
    
    if (asChild) {
      return (
        <Comp
          className={buttonClasses}
          ref={ref}
          disabled={isLoading || props.disabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };