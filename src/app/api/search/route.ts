import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const SearchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);

    // Validate and parse query parameters
    const query = SearchQuerySchema.safeParse(searchParams);
    
    if (!query.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: query.error.format() },
        { status: 400 }
      );
    }

    const { 
      q, 
      page, 
      limit, 
      category,
      minPrice,
      maxPrice
    } = query.data;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for search
    const where: any = {
      isPublished: true,
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    };

    // Category filter
    if (category) {
      const categoryObj = await prisma.category.findUnique({
        where: { slug: category },
        select: { id: true },
      });

      if (categoryObj) {
        where.categoryId = categoryObj.id;
      }
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    // Fetch total count for pagination info
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch products based on search
    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured products first
        { createdAt: 'desc' }, // Then newest products
      ],
      skip,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    // Get categories with matching products for filtering
    const categoriesWithProducts = await prisma.category.findMany({
      where: {
        products: {
          some: {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
            ],
            isPublished: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
        hasMore: page < totalPages,
      },
      categories: categoriesWithProducts,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
} 