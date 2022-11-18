import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const drinkRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) =>
      ctx.prisma.drink.findUnique({
        where: { productId: input.id },
        select: {
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
          availableSizes: {
            select: {
              selected: true,
              sizeType: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.drink.findMany({
      select: {
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
