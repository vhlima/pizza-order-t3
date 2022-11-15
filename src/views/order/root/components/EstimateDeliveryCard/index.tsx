import Card from '../../../../../components/Card';

import Typography from '../../../../../components/Typography';

const EstimateDeliveryCard: React.FC = () => (
  <Card className="flex p-3 mt-3">
    <header className="w-full flex flex-col items-center justify-center border-r border-grey pr-3 mr-3">
      <Typography
        className="font-bold uppercase"
        component="h2"
        color="primary"
      >
        23 minutes
      </Typography>

      <Typography
        className="font-bold uppercase whitespace-nowrap"
        component="h3"
        color="primary"
        size="sm"
      >
        Estimate delivery time
      </Typography>
    </header>

    <article>
      <Typography className="font-semibold" component="p" size="sm">
        Your order will be ready 23 minutes after you order.
      </Typography>
    </article>
  </Card>
);

export default EstimateDeliveryCard;
