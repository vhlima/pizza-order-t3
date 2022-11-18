import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const sideDishRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) =>
      ctx.prisma.sideDish.findUnique({
        where: { productId: input.id },
        select: {
          description: true,
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              category: {
                select: {
                  code: true,
                },
              },
            },
          },
        },
      }),
    ),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.sideDish.findMany({
      select: {
        description: true,
        product: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    }),
  ),
});
