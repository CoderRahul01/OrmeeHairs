'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8',
  {
    variants: {
      size: {
        default: 'max-w-7xl',
        sm: 'max-w-5xl',
        md: 'max-w-6xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1440px]',
        full: 'max-w-none',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'article' | 'main';
}

export function Container({
  className,
  size,
  as = 'div',
  children,
  ...props
}: ContainerProps) {
  const Component = as;
  return (
    <Component
      className={containerVariants({ size, className })}
      {...props}
    >
      {children}
    </Component>
  );
} 