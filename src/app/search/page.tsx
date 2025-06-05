'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, Filter, X, ChevronDown } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get search query from URL
  const query = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  
  // State for products and loading
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalProducts: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);
  
  // State for search form
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [minPriceValue, setMinPriceValue] = useState(minPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  
  // Fetch products based on search query
  useEffect(() => {
    if (!query) {
      setLoading(false);
      setProducts([]);
      setPagination({
        page: 1,
        limit: 12,
        totalProducts: 0,
        totalPages: 0,
        hasMore: false,
      });
      return;
    }
    
    async function fetchSearchResults() {
      setLoading(true);
      
      try {
        const params = new URLSearchParams();
        params.set('q', query);
        params.set('page', page);
        
        if (category) params.set('category', category);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        
        const response = await fetch(`/api/search?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to search products');
        }
        
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
        setPagination(data.pagination);
      } catch (err) {
        console.error('Error searching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSearchResults();
  }, [query, page, category, minPrice, maxPrice]);
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    const params = new URLSearchParams();
    params.set('q', searchTerm);
    
    if (selectedCategory) params.set('category', selectedCategory);
    if (minPriceValue) params.set('minPrice', minPriceValue);
    if (maxPriceValue) params.set('maxPrice', maxPriceValue);
    
    router.push(`/search?${params.toString()}`);
  };
  
  // Handle filter changes
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Reset page to 1 when applying filters
    params.set('page', '1');
    
    if (selectedCategory) params.set('category', selectedCategory);
    else params.delete('category');
    
    if (minPriceValue) params.set('minPrice', minPriceValue);
    else params.delete('minPrice');
    
    if (maxPriceValue) params.set('maxPrice', maxPriceValue);
    else params.delete('maxPrice');
    
    router.push(`/search?${params.toString()}`);
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/search?${params.toString()}`);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setMinPriceValue('');
    setMaxPriceValue('');
    
    const params = new URLSearchParams();
    params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };
  
  return (
    <MainLayout>
      <Section>
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-text-secondary hover:text-accent-gold"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {query && (
          <>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Heading variant="h2">
                  Search results for "{query}"
                </Heading>
                <Text variant="muted" className="mt-1">
                  {pagination.totalProducts} {pagination.totalProducts === 1 ? 'product' : 'products'} found
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
                        onClick={clearFilters}
                        className="text-sm text-accent-gold hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Categories */}
                      {categories.length > 0 && (
                        <div>
                          <Heading variant="h6" className="mb-3">Categories</Heading>
                          <div className="space-y-2">
                            {categories.map((cat) => (
                              <div key={cat.id} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`cat-${cat.slug}`}
                                  name="category"
                                  value={cat.slug}
                                  checked={selectedCategory === cat.slug}
                                  onChange={() => setSelectedCategory(cat.slug)}
                                  className="mr-2"
                                />
                                <label htmlFor={`cat-${cat.slug}`} className="flex items-center justify-between w-full text-sm">
                                  <span>{cat.name}</span>
                                  <Badge variant="ghost" size="sm">
                                    {cat._count.products}
                                  </Badge>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Price Range */}
                      <div>
                        <Heading variant="h6" className="mb-3">Price Range</Heading>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minPriceValue}
                            onChange={(e) => setMinPriceValue(e.target.value)}
                            size="sm"
                          />
                          <span className="text-text-secondary">-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxPriceValue}
                            onChange={(e) => setMaxPriceValue(e.target.value)}
                            size="sm"
                          />
                        </div>
                      </div>
                      
                      {/* Apply Button */}
                      <Button 
                        onClick={applyFilters}
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
                      {/* Categories */}
                      {categories.length > 0 && (
                        <div>
                          <Heading variant="h6" className="mb-3">Categories</Heading>
                          <div className="space-y-2">
                            {categories.map((cat) => (
                              <div key={cat.id} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`mob-cat-${cat.slug}`}
                                  name="mob-category"
                                  value={cat.slug}
                                  checked={selectedCategory === cat.slug}
                                  onChange={() => setSelectedCategory(cat.slug)}
                                  className="mr-2"
                                />
                                <label htmlFor={`mob-cat-${cat.slug}`} className="flex items-center justify-between w-full">
                                  <span>{cat.name}</span>
                                  <Badge variant="ghost" size="sm">
                                    {cat._count.products}
                                  </Badge>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Price Range */}
                      <div>
                        <Heading variant="h6" className="mb-3">Price Range</Heading>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minPriceValue}
                            onChange={(e) => setMinPriceValue(e.target.value)}
                          />
                          <span className="text-text-secondary">-</span>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxPriceValue}
                            onChange={(e) => setMaxPriceValue(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            clearFilters();
                            setShowFilters(false);
                          }}
                        >
                          Clear All
                        </Button>
                        <Button 
                          onClick={() => {
                            applyFilters();
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
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-background-secondary aspect-[4/5] rounded-md mb-3"></div>
                        <div className="h-4 bg-background-secondary rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-background-secondary rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
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
                  <div className="text-center py-16">
                    <Heading variant="h4" className="mb-2">No products found</Heading>
                    <Text className="mb-6 max-w-md mx-auto">
                      We couldn't find any products matching your search criteria. 
                      Try adjusting your search terms or filters.
                    </Text>
                    <Button asChild>
                      <Link href="/products">Browse All Products</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Section>
    </MainLayout>
  );
} 