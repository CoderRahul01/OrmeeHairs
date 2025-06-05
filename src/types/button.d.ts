import React from 'react';

declare module '@/components/ui/Button' {
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    fullWidth?: boolean;
    isLoading?: boolean;
    asChild?: boolean;
    className?: string;
  }

  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;

  export const buttonVariants: (props: {
    variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    fullWidth?: boolean;
    className?: string;
  }) => string;
} 