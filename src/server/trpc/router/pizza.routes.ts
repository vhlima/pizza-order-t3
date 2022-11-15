import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const pizzaRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => ({
  //     greeting: `Hello ${input?.text ?? 'world'}`,
  //   })),
  getPizza: publicProcedure.query(({ ctx }) =>
    ctx.prisma.pizza.findFirst({
      include: {
        product: {
          select: {
            category: {
              select: {
                code: true,
              },
            },
          },
        },
        availableBases: {
          orderBy: {
            base: {
              name: 'desc',
            },
          },
          select: {
            selected: true,
            base: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
        toppings: {
          select: {
            include: true,
            available: true,
            topping: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
        availableSizes: {
          select: {
            selected: true,
            sizeType: {
              select: {
                code: true,
                name: true,
                size: true,
              },
            },
          },
        },
      },
    }),
  ),
  getPizzaById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) =>
      ctx.prisma.pizza.findUnique({
        where: { productId: input.id },
        include: {
          product: {
            select: {
              category: {
                select: {
                  code: true,
                },
              },
            },
          },
          availableBases: {
            orderBy: {
              base: {
                name: 'desc',
              },
            },
            select: {
              selected: true,
              base: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          },
          toppings: {
            select: {
              include: true,
              available: true,
              topping: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          },
          availableSizes: {
            select: {
              selected: true,
              sizeType: {
                select: {
                  code: true,
                  name: true,
                  size: true,
                },
              },
            },
          },
        },
      }),
    ),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.pizza.findMany({
      select: {
        productId: true,
        name: true,
        description: true,
        imageUrl: true,
      },
    }),
  ),
});
