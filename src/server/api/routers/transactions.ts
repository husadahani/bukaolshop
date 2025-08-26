import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '@/lib/trpc';
import { prisma } from '@/lib/prisma';
import { createMockOrder, getMockStatus } from '@/mocks/digiflazz';
import crypto from 'crypto';

export const transactionsRouter = createTRPCRouter({
  // Create transaction
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        customerId: z.string().min(1, 'Nomor pelanggan wajib diisi'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, customerId } = input;

      // Get product
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error('Produk tidak ditemukan');
      }

      if (!product.isActive) {
        throw new Error('Produk tidak tersedia');
      }

      // Check user balance
      const user = await prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new Error('User tidak ditemukan');
      }

      if (user.balance < product.price) {
        throw new Error('Saldo tidak mencukupi');
      }

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId: ctx.session.user.id,
          productId,
          customerId,
          amount: product.price,
          status: 'PENDING',
        },
        include: {
          product: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // Deduct balance
      await prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          balance: user.balance - product.price,
        },
      });

      // Simulate Digiflazz order
      const refId = `TXN${Date.now()}`;
      const sign = crypto
        .createHash('md5')
        .update(`${process.env.DIGIFLAZZ_USERNAME}${process.env.DIGIFLAZZ_API_KEY}${refId}`)
        .digest('hex');

      const digiflazzResponse = createMockOrder({
        username: process.env.DIGIFLAZZ_USERNAME || 'test',
        buyer_sku_code: product.name,
        customer_no: customerId,
        ref_id: refId,
        sign,
      });

      // Update transaction with Digiflazz response
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          digiflazzRef: refId,
          message: digiflazzResponse.message,
          status: digiflazzResponse.status === 'success' ? 'SUCCESS' : 'FAILED',
        },
        include: {
          product: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // If failed, refund balance
      if (digiflazzResponse.status === 'failed') {
        await prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            balance: user.balance,
          },
        });
      }

      return updatedTransaction;
    }),

  // Get user transactions
  getUserTransactions: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await prisma.transaction.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return transactions;
  }),

  // Get transaction by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        include: {
          product: true,
        },
      });

      if (!transaction) {
        throw new Error('Transaksi tidak ditemukan');
      }

      return transaction;
    }),

  // Check transaction status from Digiflazz
  checkStatus: protectedProcedure
    .input(z.object({ transactionId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const transaction = await prisma.transaction.findFirst({
        where: {
          id: input.transactionId,
          userId: ctx.session.user.id,
        },
      });

      if (!transaction) {
        throw new Error('Transaksi tidak ditemukan');
      }

      if (!transaction.digiflazzRef) {
        throw new Error('Referensi Digiflazz tidak ditemukan');
      }

      // Simulate Digiflazz status check
      const sign = crypto
        .createHash('md5')
        .update(`${process.env.DIGIFLAZZ_USERNAME}${process.env.DIGIFLAZZ_API_KEY}${transaction.digiflazzRef}`)
        .digest('hex');

      const statusResponse = getMockStatus({
        username: process.env.DIGIFLAZZ_USERNAME || 'test',
        ref_id: transaction.digiflazzRef,
        sign,
      });

      // Update transaction status
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: statusResponse.status === 'success' ? 'SUCCESS' : 
                  statusResponse.status === 'failed' ? 'FAILED' : 'PENDING',
          message: statusResponse.message,
        },
        include: {
          product: true,
        },
      });

      return updatedTransaction;
    }),

  // Admin: Get all transactions
  getAll: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']).optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor, status } = input;

      const items = await prisma.transaction.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: status ? { status } : undefined,
        include: {
          product: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Admin: Update transaction status
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const transaction = await prisma.transaction.update({
        where: { id: input.id },
        data: {
          status: input.status,
          message: input.message,
        },
        include: {
          product: true,
          user: true,
        },
      });

      return transaction;
    }),
});