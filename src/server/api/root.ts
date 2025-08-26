import { createTRPCRouter } from '@/lib/trpc';
import { authRouter } from './routers/auth';
import { productsRouter } from './routers/products';
import { transactionsRouter } from './routers/transactions';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  products: productsRouter,
  transactions: transactionsRouter,
});

export type AppRouter = typeof appRouter;