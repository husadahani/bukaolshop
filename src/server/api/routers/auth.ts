import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/lib/trpc';
import { prisma } from '@/lib/prisma';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, 'Nama minimal 2 karakter'),
        email: z.string().email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter'),
        referralCode: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password, referralCode } = input;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email sudah terdaftar');
      }

      // Check referral code if provided
      let referredBy = null;
      if (referralCode) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode },
        });

        if (!referrer) {
          throw new Error('Kode referral tidak valid');
        }

        referredBy = referrer.id;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          referredBy,
        },
      });

      return {
        success: true,
        message: 'Registrasi berhasil',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          referralCode: user.referralCode,
        },
      };
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referralCode: true,
        balance: true,
        createdAt: true,
        referredByUser: {
          select: {
            name: true,
            email: true,
          },
        },
        referrals: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    return user;
  }),
});