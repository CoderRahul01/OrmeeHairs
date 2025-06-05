'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Clear results when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchTerm.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    searchTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&limit=4`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.products);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-background z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
      onKeyDown={handleKeyDown}
    >
      <div className="pt-16 h-full overflow-y-auto">
        <Container>
          <div className="flex items-center justify-between py-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto relative">
              <input
                ref={inputRef}
                type="text"
                className="w-full py-3 pl-10 pr-4 bg-transparent border-b-2 border-accent-gold/20 focus:border-accent-gold outline-none text-text-primary"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              <Search className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-5 ${focused || searchTerm ? 'text-accent-gold' : 'text-text-secondary'}`} />
            </form>
            <button
              onClick={onClose}
              className="ml-4 p-2 text-text-primary hover:text-accent-gold transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-4">
            {searchTerm.length < 2 ? (
              <div className="text-center py-8">
                <Text variant="muted">Start typing to search...</Text>
              </div>
            ) : loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-accent-gold" />
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.slug}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-background-secondary transition-colors"
                      onClick={onClose}
                    >
                      <div className="relative h-16 w-16 bg-background-secondary rounded overflow-hidden">
                        <ImageWithFallback
                          src={product.images[0] || ''}
                          alt={product.name}
                          fill
                          className="object-cover"
                          fallbackType="thumbnail"
                        />
                      </div>
                      <div className="flex-1">
                        <Text weight="medium" className="line-clamp-1">{product.name}</Text>
                        <Text variant="small" className="text-accent-gold">
                          ₹{Number(product.price).toLocaleString()}
                        </Text>
                        {product.category && (
                          <Text variant="small" className="text-text-secondary">
                            {product.category.name}
                          </Text>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => {
                      onClose();
                      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
                    }}
                  >
                    View All Results
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Text variant="muted">No products found matching "{searchTerm}"</Text>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
} 