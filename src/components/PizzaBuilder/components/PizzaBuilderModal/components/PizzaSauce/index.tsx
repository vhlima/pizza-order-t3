import Typography from '../../../../../Typography';

const PizzaSauce: React.FC = () => {
  const a = 1;

  return (
    <>
      <label htmlFor="hasSauce">
        <input
          type="checkbox"
          id="hasSauce"
          // checked={!!selectedCheese}
          // onChange={() =>
          // !selectedCheese ? setSelectedCheese(null) : resetSelectedCheese()
          // }
        />

        <Typography component="span">Sauce</Typography>
      </label>

      <p>more sauce here {a}</p>
    </>
  );
};

export default PizzaSauce;
