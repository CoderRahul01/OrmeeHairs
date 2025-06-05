'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  'font-heading tracking-tight text-text-primary',
  {
    variants: {
      variant: {
        h1: 'text-4xl md:text-5xl font-bold',
        h2: 'text-3xl md:text-4xl font-bold',
        h3: 'text-2xl md:text-3xl font-bold',
        h4: 'text-xl md:text-2xl font-bold',
        h5: 'text-lg md:text-xl font-semibold',
        h6: 'text-base md:text-lg font-semibold',
      },
    },
    defaultVariants: {
      variant: 'h1',
    },
  }
);

const textVariants = cva(
  'text-text-secondary',
  {
    variants: {
      variant: {
        default: 'text-base',
        lead: 'text-lg',
        large: 'text-lg font-medium',
        small: 'text-sm',
        muted: 'text-sm text-text-secondary/80',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      weight: 'normal',
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

export function Heading({ 
  className, 
  variant, 
  as = 'h2', 
  children, 
  ...props 
}: HeadingProps) {
  const Component = as;
  return (
    <Component 
      className={headingVariants({ variant, className })} 
      {...props}
    >
      {children}
    </Component>
  );
}

export function Text({ 
  className, 
  variant, 
  weight,
  as = 'p', 
  children, 
  ...props 
}: TextProps) {
  const Component = as;
  return (
    <Component 
      className={textVariants({ variant, weight, className })} 
      {...props}
    >
      {children}
    </Component>
  );
} 