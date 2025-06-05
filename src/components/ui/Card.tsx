'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-background border border-accent-gold/10',
        secondary: 'bg-background-secondary border border-accent-gold/10',
        outline: 'bg-transparent border border-accent-gold/20',
        ghost: 'bg-transparent',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        default: 'shadow',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'default',
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5 p-6',
  {
    variants: {
      divider: {
        true: 'border-b border-accent-gold/10',
      },
    },
    defaultVariants: {
      divider: false,
    },
  }
);

const cardContentVariants = cva('p-6', {});

const cardFooterVariants = cva(
  'flex items-center p-6 pt-0',
  {
    variants: {
      divider: {
        true: 'border-t border-accent-gold/10 pt-6',
      },
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      divider: false,
      align: 'start',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

export function Card({ className, variant, shadow, ...props }: CardProps) {
  return (
    <div
      className={cardVariants({ variant, shadow, className })}
      {...props}
    />
  );
}

export function CardHeader({ className, divider, ...props }: CardHeaderProps) {
  return (
    <div
      className={cardHeaderVariants({ divider, className })}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cardContentVariants({ className })}
      {...props}
    />
  );
}

export function CardFooter({ className, divider, align, ...props }: CardFooterProps) {
  return (
    <div
      className={cardFooterVariants({ divider, align, className })}
      {...props}
    />
  );
} 