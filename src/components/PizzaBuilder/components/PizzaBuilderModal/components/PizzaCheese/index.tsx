import Typography from '../../../../../Typography';

const PizzaCheese: React.FC = () => {
  const a = 1;

  return (
    <>
      <label htmlFor="hasCheese">
        <input
          type="checkbox"
          id="hasCheese"
          // checked={!!selectedCheese}
          // onChange={() =>
          // !selectedCheese ? setSelectedCheese(null) : resetSelectedCheese()
          // }
        />

        <Typography component="span">Cheese</Typography>
      </label>

      <p>more cheese here {a}</p>
    </>
  );
};

export default PizzaCheese;
