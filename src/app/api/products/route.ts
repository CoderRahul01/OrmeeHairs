import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const QuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(12),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'popularity']).optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);

    // Validate and parse query parameters
    const query = QuerySchema.safeParse(searchParams);
    
    if (!query.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: query.error.format() },
        { status: 400 }
      );
    }

    const { 
      page, 
      limit, 
      sort,
      category,
      search,
      minPrice,
      maxPrice
    } = query.data;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {
      isPublished: true,
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

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy based on sort parameter
    let orderBy: any = { createdAt: 'desc' };
    
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'popularity') {
      // This would ideally be based on sales or views, but for now
      // we'll just use featured status and then creation date
      orderBy = [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ];
    }

    // Fetch total count for pagination info
    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch products with filtering, sorting and pagination
    const products = await prisma.product.findMany({
      where,
      orderBy,
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

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 