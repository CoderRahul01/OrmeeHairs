import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/product/ProductGrid';
import prisma from '@/lib/prisma';
import AddToCartButton from '@/components/product/AddToCartButton';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Ormee Hair',
      description: 'The requested product could not be found.',
    };
  }
  
  return {
    title: `${product.metaTitle || product.name} | Ormee Hair`,
    description: product.metaDescription || product.description.substring(0, 160),
  };
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        isPublished: true,
      },
      include: {
        category: true,
      },
    });
    
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
        isPublished: true,
        id: {
          not: currentProductId,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      take: 4,
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);
  
  // Format the price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(product.price));
  
  // Format the compare at price if it exists
  const formattedCompareAtPrice = product.compareAtPrice
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(Number(product.compareAtPrice))
    : null;
  
  // Calculate discount percentage if compareAtPrice exists
  const discountPercentage = product.compareAtPrice
    ? Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100)
    : 0;
  
  return (
    <MainLayout>
      <div className="py-12 bg-background">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-accent-gold">
                  Home
                </Link>
              </li>
              <li className="text-text-secondary">/</li>
              <li>
                <Link href="/products" className="text-text-secondary hover:text-accent-gold">
                  Products
                </Link>
              </li>
              <li className="text-text-secondary">/</li>
              <li>
                <Link 
                  href={`/products?category=${product.category.slug}`} 
                  className="text-text-secondary hover:text-accent-gold"
                >
                  {product.category.name}
                </Link>
              </li>
              <li className="text-text-secondary">/</li>
              <li className="text-text-primary font-medium truncate max-w-[150px]">
                {product.name}
              </li>
            </ol>
          </nav>
          
          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative bg-background-secondary rounded-lg overflow-hidden">
                <Image
                  src={product.images[0] as string || 'https://placeholder.com/800x800'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      className="aspect-square relative bg-background-secondary rounded-md overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={image as string}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div>
              <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-medium text-text-primary">{formattedPrice}</span>
                {formattedCompareAtPrice && (
                  <>
                    <span className="text-lg text-text-secondary line-through">{formattedCompareAtPrice}</span>
                    <span className="text-sm font-medium text-accent-rose">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              
              <div className="mb-6 prose prose-sm max-w-none text-text-secondary" dangerouslySetInnerHTML={{ __html: product.description }} />
              
              {/* Add to Cart Section */}
              <div className="py-4 border-t border-b border-accent-gold/10 mb-6">
                <AddToCartButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    image: product.images[0] as string || 'https://placeholder.com/800x800',
                  }}
                />
              </div>
              
              {/* Product Details */}
              <div className="space-y-4">
                {product.sku && (
                  <div className="flex">
                    <span className="w-24 text-sm font-medium text-text-primary">SKU:</span>
                    <span className="text-sm text-text-secondary">{product.sku}</span>
                  </div>
                )}
                
                <div className="flex">
                  <span className="w-24 text-sm font-medium text-text-primary">Category:</span>
                  <Link 
                    href={`/products?category=${product.category.slug}`}
                    className="text-sm text-accent-gold hover:underline"
                  >
                    {product.category.name}
                  </Link>
                </div>
                
                {product.weight && (
                  <div className="flex">
                    <span className="w-24 text-sm font-medium text-text-primary">Weight:</span>
                    <span className="text-sm text-text-secondary">{product.weight}g</span>
                  </div>
                )}
                
                <div className="flex">
                  <span className="w-24 text-sm font-medium text-text-primary">Availability:</span>
                  <span className={`text-sm ${product.inventory > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 