import { type NextApiRequest, type NextApiResponse } from 'next';

import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const pizzas = await prisma.pizza.findMany();
  return res.status(200).json(pizzas);
};

export default examples;
