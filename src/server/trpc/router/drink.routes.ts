import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const drinkRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) =>
      ctx.prisma.drink.findUnique({
        where: { productId: input.id },
        select: {
          name: true,
          imageUrl: true,
          availableSizes: {
            select: {
              selected: true,
              drinkSize: {
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
        productId: true,
        name: true,
        imageUrl: true,
      },
    }),
  ),
});
