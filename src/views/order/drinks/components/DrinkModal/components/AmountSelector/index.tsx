import Typography from '../../../../../../../components/Typography';

interface AmountSelectorProps {
  onClickAdd: () => void;
  onClickSub: () => void;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
  onClickAdd,
  onClickSub,
}) => (
  <div className="flex items-center ml-auto">
    <button
      className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
      type="button"
      disabled
      onClick={onClickAdd}
    >
      <Typography
        className="group-disabled:text-white-200"
        component="span"
        color="secondary"
        size="lg"
      >
        -
      </Typography>
    </button>

    <Typography className="mx-3" component="span">
      1
    </Typography>

    <button
      className="w-10 h-10 rounded-full bg-blue-200 disabled:bg-gray-300 group"
      type="button"
      onClick={onClickSub}
    >
      <Typography
        className="group-disabled:text-white-200"
        component="span"
        color="secondary"
        size="lg"
      >
        +
      </Typography>
    </button>
  </div>
);

export default AmountSelector;
