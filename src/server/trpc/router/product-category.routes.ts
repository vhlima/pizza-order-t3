import { router, publicProcedure } from '../trpc';

export const productCategoryRouter = router({
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.productCategory.findMany({
      select: {
        code: true,
        name: true,
        imageUrl: true,
      },
    }),
  ),
});
