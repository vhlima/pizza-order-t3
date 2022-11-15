import { router } from '../trpc';
import { drinkRouter } from './drink.routes';

import { exampleRouter } from './example';

import { pizzaRouter } from './pizza.routes';

import { productCategoryRouter } from './product-category.routes';

export const appRouter = router({
  example: exampleRouter,
  pizza: pizzaRouter,
  drink: drinkRouter,
  productCategory: productCategoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
