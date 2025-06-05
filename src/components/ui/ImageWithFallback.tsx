'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getPlaceholderImage } from '@/lib/utils/placeholders';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackType?: 'cover' | 'thumbnail';
}

export function ImageWithFallback({
  src,
  alt,
  fallbackType = 'cover',
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(getPlaceholderImage(fallbackType));
  };

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
} 