'use client';

import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  image: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  badge?: string;
}

export function HeroSection({
  title,
  subtitle,
  image,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  badge
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-background to-accent-gold/5 py-20 md:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left z-10">
            <Heading as="h1" variant="h1" className="mb-6">
              {title.split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {i === arr.length - 1 ? (
                    <span className="text-accent-gold">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </React.Fragment>
              ))}
            </Heading>
            
            <Text variant="lead" className="mb-8">
              {subtitle}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href={primaryButtonLink}>
                  {primaryButtonText}
                </Link>
              </Button>
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryButtonLink}>
                    {secondaryButtonText}
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl relative">
              <div className="absolute inset-0 bg-accent-gold/10"></div>
              <ImageWithFallback
                src={image}
                alt="Premium Hair"
                fill
                className="object-cover"
                priority
                fallbackType="cover"
              />
            </div>
            
            {badge && (
              <div className="absolute -bottom-6 -left-6 bg-accent-gold text-white p-4 rounded-lg shadow-lg md:max-w-[200px]">
                <Text as="p" weight="medium" className="font-heading text-lg text-white">
                  {badge.split('\n')[0]}
                </Text>
                {badge.split('\n')[1] && (
                  <Text as="p" variant="small" className="mt-1 text-white/90">
                    {badge.split('\n')[1]}
                  </Text>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-gold/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
} 