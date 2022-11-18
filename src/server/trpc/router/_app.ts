import { router } from '../trpc';

import { drinkRouter } from './drink.routes';

import { pizzaRouter } from './pizza.routes';

import { sideDishRouter } from './side-dish.routes';

import { productCategoryRouter } from './product-category.routes';

export const appRouter = router({
  pizza: pizzaRouter,
  drink: drinkRouter,
  sideDish: sideDishRouter,
  productCategory: productCategoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
