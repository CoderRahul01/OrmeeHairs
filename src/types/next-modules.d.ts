// Type definitions for Next.js modules
declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string | string[];
    [key: string]: any;
  };
}

declare module 'next/font/google' {
  interface FontOptions {
    subsets?: string[];
    variable?: string;
    display?: string;
    weight?: string | string[];
    style?: string | string[];
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

// This allows TypeScript to understand that these modules exist
declare module 'next/image';
declare module 'next/link';
declare module 'lucide-react'; 