'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, Share2, Star, StarHalf, ShoppingBag, Check } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useCart } from '@/lib/contexts/CartContext';
import AddToCartButton from '@/components/product/AddToCartButton';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      
      try {
        const response = await fetch(`/api/products/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          } else {
            throw new Error('Failed to fetch product');
          }
        }
        
        const data = await response.json();
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
        setSelectedImage(0); // Reset selected image
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: quantity,
        image: product.images[0] as string,
      });
    }
  };

  const handleQuantityChange = (amount) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(Number(amount));
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (product?.compareAtPrice && product.compareAtPrice > product.price) {
      return Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <MainLayout>
        <Section spacing="lg">
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse space-y-8 w-full max-w-4xl mx-auto">
              <div className="flex gap-8">
                <div className="w-1/2 aspect-square bg-background-secondary rounded-lg"></div>
                <div className="w-1/2 space-y-4">
                  <div className="h-8 bg-background-secondary rounded w-3/4"></div>
                  <div className="h-6 bg-background-secondary rounded w-1/4"></div>
                  <div className="h-4 bg-background-secondary rounded w-full"></div>
                  <div className="h-4 bg-background-secondary rounded w-full"></div>
                  <div className="h-4 bg-background-secondary rounded w-3/4"></div>
                  <div className="h-10 bg-background-secondary rounded w-full mt-8"></div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Section spacing="lg">
          <div className="text-center py-20">
            <Heading variant="h3" className="mb-4">Oops! {error}</Heading>
            <Text className="mb-6">We couldn't find the product you're looking for.</Text>
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
        </Section>
      </MainLayout>
    );
  }

  if (!product) {
    return null;
  }

  const discount = calculateDiscount();

  return (
    <MainLayout>
      <Container>
        {/* Breadcrumbs */}
        <nav className="py-4 flex items-center text-sm">
          <Link href="/" className="text-text-secondary hover:text-accent-gold">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-text-secondary" />
          <Link href="/products" className="text-text-secondary hover:text-accent-gold">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-text-secondary" />
          <Link 
            href={`/products?category=${product.category.slug}`} 
            className="text-text-secondary hover:text-accent-gold"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-text-secondary" />
          <span className="text-text-primary font-medium truncate">
            {product.name}
          </span>
        </nav>
      </Container>

      <Section spacing="lg" variant="default">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-background-secondary rounded-lg overflow-hidden">
              <ImageWithFallback
                src={product.images[selectedImage] as string}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
                fallbackType="product"
              />
              {discount > 0 && (
                <Badge variant="secondary" className="absolute top-4 left-4">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square relative bg-background-secondary rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-accent-gold' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <ImageWithFallback
                      src={image as string}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      fallbackType="thumbnail"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Heading variant="h2" className="mb-2">
                {product.name}
              </Heading>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-accent-gold">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <StarHalf className="h-5 w-5 fill-current" />
                </div>
                <Text variant="small" className="text-text-secondary">
                  4.5 (24 reviews)
                </Text>
              </div>
              
              <div className="flex items-end gap-2 mb-4">
                <Text as="span" className="text-2xl font-medium text-text-primary">
                  {formatCurrency(product.price)}
                </Text>
                {product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price) && (
                  <>
                    <Text as="span" className="text-lg text-text-secondary line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </Text>
                    {discount > 0 && (
                      <Text as="span" className="text-sm font-medium text-accent-rose">
                        Save {discount}%
                      </Text>
                    )}
                  </>
                )}
              </div>
              
              <div className="prose prose-sm max-w-none text-text-secondary mb-6">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            </div>
            
            {/* Add to Cart Section */}
            <div className="pt-6 border-t border-accent-gold/10">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-accent-gold/20 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-background-secondary"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 h-10 text-center border-x border-accent-gold/20 bg-transparent text-text-primary"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-background-secondary"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                {/* Add to Cart Button */}
                <div className="flex-1 w-full sm:w-auto">
                  <Button 
                    onClick={handleAddToCart}
                    fullWidth
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="pt-6 border-t border-accent-gold/10 space-y-3">
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <Text weight="medium">Free shipping</Text>
                  <Text variant="small" className="text-text-secondary">
                    On orders over ₹999
                  </Text>
                </div>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <Text weight="medium">EMI options available</Text>
                  <Text variant="small" className="text-text-secondary">
                    Via Razorpay at checkout
                  </Text>
                </div>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <Text weight="medium">30-day returns</Text>
                  <Text variant="small" className="text-text-secondary">
                    Shop with confidence
                  </Text>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="pt-6 border-t border-accent-gold/10 space-y-4">
              <div className="flex">
                <Text as="span" className="w-24 text-sm font-medium text-text-primary">SKU:</Text>
                <Text as="span" className="text-sm text-text-secondary">{product.sku || 'N/A'}</Text>
              </div>
              
              <div className="flex">
                <Text as="span" className="w-24 text-sm font-medium text-text-primary">Category:</Text>
                <Link 
                  href={`/products?category=${product.category.slug}`}
                  className="text-sm text-accent-gold hover:underline"
                >
                  {product.category.name}
                </Link>
              </div>
              
              {product.weight && (
                <div className="flex">
                  <Text as="span" className="w-24 text-sm font-medium text-text-primary">Weight:</Text>
                  <Text as="span" className="text-sm text-text-secondary">{product.weight}g</Text>
                </div>
              )}
              
              <div className="flex">
                <Text as="span" className="w-24 text-sm font-medium text-text-primary">Availability:</Text>
                <Text as="span" className={`text-sm ${product.inventory > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section variant="secondary" spacing="lg">
          <Heading variant="h2" className="mb-8 text-center">
            You May Also Like
          </Heading>
          <ProductGrid products={relatedProducts} columns={4} />
        </Section>
      )}
    </MainLayout>
  );
} 