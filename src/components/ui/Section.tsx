'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Container, ContainerProps } from './Container';

const sectionVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'bg-background',
        secondary: 'bg-background-secondary',
        accent: 'bg-accent-gold/5',
      },
      spacing: {
        none: '',
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16',
        xl: 'py-24',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'lg',
    },
  }
);

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  containerProps?: ContainerProps;
  containerSize?: ContainerProps['size'];
}

export function Section({
  className,
  variant,
  spacing,
  containerProps,
  containerSize,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={sectionVariants({ variant, spacing, className })}
      {...props}
    >
      <Container size={containerSize} {...containerProps}>
        {children}
      </Container>
    </section>
  );
} 