import React from 'react';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/product/ProductGrid';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'All Products | Ormee Hair',
  description: 'Browse our premium collection of hair extensions, wigs, and hair care products at Ormee Hair.',
};

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <MainLayout>
      <div className="py-12 bg-background">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8">
            All Products
          </h1>
          
          {products.length > 0 ? (
            <ProductGrid products={products} columns={4} />
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 