declare module 'next' {
  import { NextConfig } from 'next/dist/server/config-shared';
  
  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string | string[];
    authors?: Array<{ name: string; url?: string }>;
    creator?: string;
    publisher?: string;
    robots?: string;
    canonical?: string;
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: Array<{ url: string; alt?: string; width?: number; height?: number }>;
      locale?: string;
      type?: string;
    };
    twitter?: {
      card?: string;
      site?: string;
      creator?: string;
      title?: string;
      description?: string;
      image?: string;
    };
    viewport?: string;
    verification?: {
      google?: string;
      yandex?: string;
      yahoo?: string;
      other?: Record<string, string>;
    };
    [key: string]: any;
  };

  export type AppProps = {
    Component: React.ComponentType<any>;
    pageProps: any;
  };
}

declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    quality?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    sizes?: string;
    className?: string;
  }

  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'next/link' {
  import { LinkHTMLAttributes } from 'react';

  export interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }

  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'lucide-react' {
  import React from 'react';

  export interface IconProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
  }

  export const ArrowRight: React.FC<IconProps>;
  export const Loader2: React.FC<IconProps>;
  export const ShoppingBag: React.FC<IconProps>;
  export const ShoppingCart: React.FC<IconProps>;
  export const Heart: React.FC<IconProps>;
  // Add other icons as needed
} 