'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-accent-gold text-white',
        secondary: 'bg-accent-rose text-white',
        outline: 'bg-transparent border border-accent-gold text-accent-gold',
        ghost: 'bg-accent-gold/10 text-accent-gold',
        destructive: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-amber-500 text-white',
        info: 'bg-blue-500 text-white',
      },
      size: {
        default: 'text-xs',
        sm: 'text-xs scale-90',
        lg: 'text-sm px-3 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={badgeVariants({ variant, size, className })}
      {...props}
    />
  );
} 