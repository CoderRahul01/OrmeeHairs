declare module 'next/font/google' {
  export interface FontOptions {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    variable?: string;
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean | string;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };

  export function Playfair_Display(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };
} 