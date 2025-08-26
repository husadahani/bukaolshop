import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure, adminProcedure } from '@/lib/trpc';
import { prisma } from '@/lib/prisma';
import { getMockProducts } from '@/mocks/digiflazz';

export const productsRouter = createTRPCRouter({
  // Get all products from database
  getAll: publicProcedure.query(async () => {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return products;
  }),

  // Get products by category
  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          category: input.category as any,
          isActive: true,
        },
        orderBy: { price: 'asc' },
      });

      return products;
    }),

  // Get single product
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new Error('Produk tidak ditemukan');
      }

      return product;
    }),

  // Get Digiflazz products (mock)
  getDigiflazzProducts: publicProcedure.query(async () => {
    const products = getMockProducts();
    return products;
  }),

  // Admin: Create product
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Nama produk wajib diisi'),
        description: z.string().optional(),
        category: z.enum(['PULSA', 'PAKET_DATA', 'TOKEN_PLN', 'VOUCHER_GAME', 'PASCABAYAR']),
        price: z.number().positive('Harga harus positif'),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.create({
        data: input,
      });

      return product;
    }),

  // Admin: Update product
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, 'Nama produk wajib diisi'),
        description: z.string().optional(),
        category: z.enum(['PULSA', 'PAKET_DATA', 'TOKEN_PLN', 'VOUCHER_GAME', 'PASCABAYAR']),
        price: z.number().positive('Harga harus positif'),
        image: z.string().optional(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const product = await prisma.product.update({
        where: { id: input.id },
        data: input,
      });

      return product;
    }),

  // Admin: Delete product
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.product.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});