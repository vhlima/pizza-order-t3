import Image from '../../../../../components/Image';

import Typography from '../../../../../components/Typography';

interface ProductSuggestionProps {
  name: string;
  imageUrl: string;
}

const ProductSuggestion: React.FC<ProductSuggestionProps> = ({
  name,
  imageUrl,
}) => (
  <div className="flex flex-col gap-2">
    <Image className="rounded-sm" src={imageUrl} alt={name} />

    <Typography
      className="font-bold text-center"
      component="span"
      color="primary"
      size="sm"
    >
      {name}
    </Typography>
  </div>
);

export default ProductSuggestion;
