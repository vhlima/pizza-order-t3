import Image from '../../../../../components/Image';
import Typography from '../../../../../components/Typography';

interface DrinkProps {
  name: string;
  imageUrl: string;

  onClick: () => void;
}

const Drink: React.FC<DrinkProps> = ({ name, imageUrl, onClick }) => (
  <li>
    <button className="flex flex-col w-full" type="button" onClick={onClick}>
      <Image className="rounded-md" src={imageUrl} alt={name} />

      <Typography className="font-bold mt-1" component="h2" color="primary">
        {name}
      </Typography>
    </button>
  </li>
);

export default Drink;
