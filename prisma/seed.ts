import { PrismaClient } from '../src/generated/prisma'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ormeehair.com'
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log(`Created admin user: ${admin.email}`)

  // Create Categories
  const categories = [
    {
      name: 'Hair Extensions',
      slug: 'hair-extensions',
      description: 'Premium quality hair extensions for all hair types.',
      image: 'https://placeholder.com/800x600',
      metaTitle: 'Hair Extensions | Ormee Hair',
      metaDescription: 'Shop premium quality hair extensions at Ormee Hair. Find the perfect match for your hair type and color.',
    },
    {
      name: 'Wigs',
      slug: 'wigs',
      description: 'Natural-looking wigs made with 100% human hair.',
      image: 'https://placeholder.com/800x600',
      metaTitle: 'Wigs | Ormee Hair',
      metaDescription: 'Shop premium quality wigs at Ormee Hair. Find the perfect match for your style and occasion.',
    },
    {
      name: 'Hair Care',
      slug: 'hair-care',
      description: 'Premium hair care products to maintain your Ormee hair extensions and wigs.',
      image: 'https://placeholder.com/800x600',
      metaTitle: 'Hair Care Products | Ormee Hair',
      metaDescription: 'Shop premium hair care products at Ormee Hair. Keep your extensions and wigs looking their best.',
    },
  ]

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        ...category,
        isActive: true,
      },
    })
    console.log(`Created category: ${createdCategory.name}`)
  }

  // Create Sub-Categories
  const subCategories = [
    {
      name: 'Clip-in Extensions',
      slug: 'clip-in-extensions',
      description: 'Easy to apply clip-in hair extensions.',
      parentSlug: 'hair-extensions',
      image: 'https://placeholder.com/800x600',
    },
    {
      name: 'Tape-in Extensions',
      slug: 'tape-in-extensions',
      description: 'Seamless tape-in hair extensions for a natural look.',
      parentSlug: 'hair-extensions',
      image: 'https://placeholder.com/800x600',
    },
    {
      name: 'Lace Front Wigs',
      slug: 'lace-front-wigs',
      description: 'Natural-looking lace front wigs for a seamless hairline.',
      parentSlug: 'wigs',
      image: 'https://placeholder.com/800x600',
    },
    {
      name: 'Shampoos',
      slug: 'shampoos',
      description: 'Gentle shampoos specifically formulated for hair extensions and wigs.',
      parentSlug: 'hair-care',
      image: 'https://placeholder.com/800x600',
    },
  ]

  for (const subCategory of subCategories) {
    const parentCategory = await prisma.category.findUnique({
      where: { slug: subCategory.parentSlug },
    })

    if (parentCategory) {
      const createdSubCategory = await prisma.category.upsert({
        where: { slug: subCategory.slug },
        update: {},
        create: {
          name: subCategory.name,
          slug: subCategory.slug,
          description: subCategory.description,
          image: subCategory.image,
          isActive: true,
          parentId: parentCategory.id,
        },
      })
      console.log(`Created sub-category: ${createdSubCategory.name}`)
    }
  }

  // Create Sample Products
  const products = [
    {
      name: 'Classic Clip-in Hair Extensions - 20"',
      slug: 'classic-clip-in-extensions-20-inch',
      description: 'Premium quality clip-in hair extensions made with 100% Remy human hair. These 20" extensions add instant length and volume to your natural hair.',
      price: 249.99,
      compareAtPrice: 299.99,
      images: [
        'https://placeholder.com/800x800',
        'https://placeholder.com/800x800',
        'https://placeholder.com/800x800',
      ],
      inventory: 50,
      weight: 0.3,
      dimensions: { length: 20, width: 10, height: 5 },
      sku: 'EXT-CLP-20-BLK',
      featured: true,
      categorySlug: 'clip-in-extensions',
    },
    {
      name: 'Natural Lace Front Wig - Medium Length',
      slug: 'natural-lace-front-wig-medium',
      description: 'Achieve a natural-looking hairline with our premium lace front wig. Made with 100% human hair for a realistic appearance and feel.',
      price: 399.99,
      compareAtPrice: 499.99,
      images: [
        'https://placeholder.com/800x800',
        'https://placeholder.com/800x800',
      ],
      inventory: 25,
      weight: 0.5,
      dimensions: { length: 15, width: 15, height: 10 },
      sku: 'WIG-LF-MED-BLK',
      featured: true,
      categorySlug: 'lace-front-wigs',
    },
    {
      name: 'Extension Care Shampoo',
      slug: 'extension-care-shampoo',
      description: 'Specially formulated shampoo to care for your hair extensions. Gentle on bonded and clip-in extensions while maintaining natural shine.',
      price: 24.99,
      compareAtPrice: 29.99,
      images: [
        'https://placeholder.com/800x800',
      ],
      inventory: 100,
      weight: 0.35,
      dimensions: { length: 5, width: 5, height: 15 },
      sku: 'CARE-SH-01',
      featured: false,
      categorySlug: 'shampoos',
    },
  ]

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
    })

    if (category) {
      const createdProduct = await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          images: product.images,
          inventory: product.inventory,
          weight: product.weight,
          dimensions: product.dimensions,
          sku: product.sku,
          featured: product.featured,
          isPublished: true,
          categoryId: category.id,
          metaTitle: product.name,
          metaDescription: product.description.substring(0, 160),
        },
      })
      console.log(`Created product: ${createdProduct.name}`)
    }
  }

  // Create a sample blog post
  await prisma.post.upsert({
    where: { slug: 'hair-extensions-care-guide' },
    update: {},
    create: {
      title: 'The Ultimate Hair Extensions Care Guide',
      slug: 'hair-extensions-care-guide',
      content: `
# The Ultimate Hair Extensions Care Guide

Hair extensions are an investment in your appearance, and proper care is essential to ensure they remain beautiful and long-lasting. Here's our comprehensive guide to caring for your Ormee Hair extensions.

## Daily Care

1. **Brushing**: Always use a loop brush or extension-specific brush. Start from the ends and work your way up to avoid pulling on the attachments.
2. **Washing**: Use sulfate-free, extension-safe shampoo and conditioner. Wash your extensions every 7-10 days, or when product buildup becomes noticeable.
3. **Heat Styling**: Apply a heat protectant before using any hot tools. Keep heat settings below 350°F (180°C) to prevent damage.

## Sleeping With Extensions

1. **Braid Loosely**: Before bed, loosely braid your hair to prevent tangling.
2. **Silk Pillowcase**: Use a silk or satin pillowcase to reduce friction and prevent frizz.

## Long-Term Maintenance

1. **Professional Check-ups**: Visit your stylist every 4-6 weeks for maintenance and adjustments.
2. **Deep Conditioning**: Use a deep conditioning treatment once a month to keep your extensions hydrated.
3. **Color Treatments**: Only use color-safe products and consult with a professional before coloring your extensions.

Follow these guidelines to enjoy beautiful, long-lasting hair extensions that look and feel natural!
      `,
      excerpt: 'Learn how to properly care for your hair extensions to ensure they remain beautiful and long-lasting.',
      featuredImage: 'https://placeholder.com/1200x800',
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: 'Hair Extensions Care Guide | Ormee Hair Blog',
      metaDescription: 'Learn how to properly care for your hair extensions to ensure they remain beautiful and long-lasting. Read our comprehensive guide.',
    },
  })
  console.log(`Created sample blog post`)

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })