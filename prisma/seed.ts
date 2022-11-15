import { PrismaClient } from '@prisma/client';
import { drinks } from './seeds/drinks';

import { pizzaBases } from './seeds/pizza-bases';

import { pizzaSizeTypes } from './seeds/pizza-size';

import { pizzaToppings } from './seeds/pizza-toppings';

import { pizzas } from './seeds/pizzas';
import { productCategories } from './seeds/product-categories';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Starting seeding');

  const sizeTypePromise = pizzaSizeTypes.map(sizeType =>
    prisma.pizzaSizeType.create({
      data: sizeType,
    }),
  );

  await Promise.all(sizeTypePromise);

  console.log('[Seed] pizza_size_types seeded with success');

  const toppingPromise = pizzaToppings.map(topping =>
    prisma.toppingType.create({
      data: topping,
    }),
  );

  await Promise.all(toppingPromise);

  console.log('[Seed] pizza_topping_types seeded with success');

  const basesPromise = pizzaBases.map(base =>
    prisma.pizzaBaseType.create({
      data: base,
    }),
  );

  await Promise.all(basesPromise);

  console.log('[Seed] pizza_base_types seeded with success');

  const categoriesPromise = productCategories.map(category =>
    prisma.productCategory.create({
      data: category,
    }),
  );

  await Promise.all(categoriesPromise);

  console.log('[Seed] product_categories seeded with success');

  const drinksPromise = drinks.map(drink =>
    prisma.drink.create({
      data: drink,
    }),
  );

  await Promise.all(drinksPromise);

  console.log('[Seed] drinks seeded with success');

  const pizzaPromise = pizzas.map(pizza =>
    prisma.pizza.create({
      data: {
        ...pizza,
      },
    }),
  );

  await Promise.all(pizzaPromise);

  console.log(`[Seed] pizzas seeded with success`);

  console.log(`[Seed] Seeding finished`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
