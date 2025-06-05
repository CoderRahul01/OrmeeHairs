'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Loader2, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Products | Ormee Hair',
  description: 'Browse our premium collection of hair extensions, wigs, and hair care products at Ormee Hair.',
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalProducts: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');

  // Get all query params
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';

  // Fetch products based on search params
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      try {
        const queryParams = new URLSearchParams({
          page,
          limit: '12',
        });
        
        if (category) queryParams.set('category', category);
        if (sort) queryParams.set('sort', sort);
        if (search) queryParams.set('search', search);
        if (minPriceParam) queryParams.set('minPrice', minPriceParam);
        if (maxPriceParam) queryParams.set('maxPrice', maxPriceParam);
        
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
        
        // Set filter states from URL params
        setSelectedCategory(category);
        setSortOption(sort);
        setMinPrice(minPriceParam);
        setMaxPrice(maxPriceParam);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [page, category, sort, search, minPriceParam, maxPriceParam]);

  // Apply filters
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Reset to page 1 when applying new filters
    params.set('page', '1');
    
    // Update filter params
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');
    
    if (sortOption) params.set('sort', sortOption);
    else params.delete('sort');
    
    router.push(`/products?${params.toString()}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSortOption('newest');
    
    const params = new URLSearchParams();
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  // Loading state
  if (loading && !products.length) {
    return (
      <MainLayout>
        <Section>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent-gold" />
          </div>
        </Section>
      </MainLayout>
    );
  }

  // Error state
  if (error && !products.length) {
    return (
      <MainLayout>
        <Section>
          <div className="text-center py-20">
            <Heading variant="h3" className="mb-4">Oops! Something went wrong</Heading>
            <Text className="mb-6">{error}</Text>
            <Button onClick={() => router.push('/products')}>Try Again</Button>
          </div>
        </Section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Section>
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Heading variant="h2">
              {search 
                ? `Search results for "${search}"`
                : category 
                ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                : 'All Products'
              }
            </Heading>
            <Text variant="muted" className="mt-1">
              {pagination.totalProducts} products found
            </Text>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border rounded-md border-accent-gold/20">
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  const params = new URLSearchParams(searchParams);
                  params.set('sort', e.target.value);
                  params.set('page', '1');
                  router.push(`/products?${params.toString()}`);
                }}
                className="appearance-none bg-transparent py-2 pl-3 pr-8 text-sm focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Heading variant="h5">Filters</Heading>
                  <button 
                    onClick={handleClearFilters}
                    className="text-sm text-accent-gold hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <Heading variant="h6" className="mb-3">Price Range</Heading>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        size="sm"
                      />
                      <span className="text-text-secondary">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        size="sm"
                      />
                    </div>
                  </div>
                  
                  {/* Apply Button */}
                  <Button 
                    onClick={handleApplyFilters}
                    fullWidth
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 bg-background z-40 overflow-y-auto pt-16">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Heading variant="h5">Filters</Heading>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <Heading variant="h6" className="mb-3">Price Range</Heading>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <span className="text-text-secondary">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={handleClearFilters}
                    >
                      Clear All
                    </Button>
                    <Button 
                      onClick={() => {
                        handleApplyFilters();
                        setShowFilters(false);
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="md:col-span-3">
            {products.length > 0 ? (
              <>
                <ProductGrid products={products} columns={3} />
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(Number(page) - 1)}
                        disabled={Number(page) <= 1}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex items-center">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                          .filter(p => (
                            p === 1 || 
                            p === pagination.totalPages || 
                            Math.abs(p - Number(page)) <= 1
                          ))
                          .map((p, i, arr) => (
                            <React.Fragment key={p}>
                              {i > 0 && arr[i - 1] !== p - 1 && (
                                <span className="px-2 text-text-secondary">...</span>
                              )}
                              <button
                                className={`h-8 w-8 flex items-center justify-center rounded-md ${
                                  Number(page) === p 
                                    ? 'bg-accent-gold text-white'
                                    : 'text-text-primary hover:bg-background-secondary'
                                }`}
                                onClick={() => handlePageChange(p)}
                              >
                                {p}
                              </button>
                            </React.Fragment>
                          ))
                        }
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(Number(page) + 1)}
                        disabled={Number(page) >= pagination.totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Heading variant="h4" className="mb-2">No products found</Heading>
                <Text className="mb-6 max-w-md">
                  We couldn't find any products matching your criteria. Try adjusting your filters or browse our full collection.
                </Text>
                <Button onClick={handleClearFilters}>View All Products</Button>
              </div>
            )}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
} 