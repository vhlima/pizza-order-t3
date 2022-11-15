import { useRouter } from 'next/router';

import { BsTriangleFill } from 'react-icons/bs';

import Typography from '../Typography';

interface GoBackButtonProps {
  backRoute: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ backRoute }) => {
  const { query, push } = useRouter();

  if (!query.withBack) {
    return null;
  }

  return (
    <button
      className="flex items-center gap-2 p-3 border border-grey rounded-sm text-left bg-white"
      type="button"
      onClick={() => {
        push(backRoute);
      }}
    >
      <BsTriangleFill className="text-blue-100" size={20} />

      <Typography
        className="font-bold uppercase"
        component="span"
        color="primary"
      >
        Go back
      </Typography>
    </button>
  );
};

export default GoBackButton;
