import type { ModalHandles } from '../../../Modal';

import Modal from '../../../Modal';

import Typography from '../../../Typography';

import StepCard from './components/StepCard';

import PizzaBases from './components/PizzaBases';

import PizzaSizes from './components/PizzaSizes';

import PizzaSauce from './components/PizzaSauce';

import PizzaCheese from './components/PizzaCheese';

import PizzaSummaryCard from './components/PizzaSummary';

import PizzaToppings from './components/PizzaToppings';

type PizzaBuilderModalProps = ModalHandles;

const PizzaBuilderModal: React.FC<PizzaBuilderModalProps> = ({ onClose }) => (
  <Modal className="w-screen h-screen overflow-y-auto p-4" onClose={onClose}>
    <button className="p-1 text-2xl" type="button" onClick={onClose}>
      X
    </button>

    <div className="flex flex-col gap-4">
      <StepCard title="1. Size and Base">
        <PizzaSizes />

        <PizzaBases />
      </StepCard>

      <StepCard title="2. Cheese">
        <PizzaCheese />
      </StepCard>

      <StepCard title="3. Sauce">
        <PizzaSauce />
      </StepCard>

      <StepCard title="4. Toppings" padding={false}>
        <PizzaToppings />
      </StepCard>

      <Typography className="font-bold" component="span" size="sm">
        Each additional serving of ingredient contains 1/3 of the regular
        serving
      </Typography>

      <PizzaSummaryCard onSubmit={onClose} />
    </div>
  </Modal>
);

export default PizzaBuilderModal;
