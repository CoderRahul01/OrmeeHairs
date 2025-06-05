// Global declarations for Next.js and related modules

// Next.js core module
declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string | string[];
    [key: string]: any;
  };
}

// Next.js font module
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

// Next.js image component
declare module 'next/image' {
  import React from 'react';
  
  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    className?: string;
    [key: string]: any;
  }
  
  const Image: React.FC<ImageProps>;
  export default Image;
}

// Next.js link component
declare module 'next/link' {
  import React from 'react';
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    [key: string]: any;
  }
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

// Lucide React icons
declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    [key: string]: any;
  }
  
  export const ArrowRight: React.FC<IconProps>;
  export const Loader2: React.FC<IconProps>;
} 