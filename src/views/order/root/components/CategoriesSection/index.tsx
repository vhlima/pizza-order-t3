import { trpc } from '../../../../../utils/trpc';

import Card from '../../../../../components/Card';

import Image from '../../../../../components/Image';

import Link from '../../../../../components/Link';

import Typography from '../../../../../components/Typography';

const CategoriesSection: React.FC = () => {
  const { data } = trpc.productCategory.getAll.useQuery();

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {data.map(({ name, imageUrl }) => (
        <Card
          key={`category-card-${name}`}
          className="p-3 text-center select-none cursor-pointer hover:border-blue-200"
        >
          <Link
            href={{
              pathname: '/order/pizza',
              query: { withBack: true },
            }}
          >
            <Image src={imageUrl} alt={name} />

            <Typography className="font-bold" component="h2" color="primary">
              {name}
            </Typography>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CategoriesSection;
