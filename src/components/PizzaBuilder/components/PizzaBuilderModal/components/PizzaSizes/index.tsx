import clsx from 'clsx';

import { usePizzaBuilder } from '../../../../../../hooks/usePizzaBuilder';

import Typography from '../../../../../Typography';

import { useLogic } from './logic';

const PizzaSizes: React.FC = () => {
  const { pizza } = usePizzaBuilder();

  const { handleChangeSize } = useLogic();

  return (
    <div className="flex justify-center gap-3 pb-3 mb-3 border-b border-grey">
      {pizza.availableSizes
        .sort((s1, s2) => s1.sizeType.size - s2.sizeType.size)
        .map(({ sizeType }) => (
          <button
            className="flex flex-col items-center"
            key={`pizza-size-${sizeType.code}`}
            type="button"
            onClick={() => handleChangeSize(sizeType.code)}
          >
            <div
              className={clsx(
                'relative mt-auto shadow-sm shadow-black border border-blue-200 rounded-full overflow-hidden',
                {
                  'bg-blue-200': true,
                  'bg-blue-50':
                    pizza.availableSizes.find(size => size.selected)?.sizeType
                      .code === sizeType.code,
                },
              )}
              style={{ padding: `${(sizeType.size - 30) * 0.05 + 1}rem` }}
            >
              <Typography
                className="font-bold"
                style={{
                  textShadow:
                    '0 1px hsla(0,0%,100%,.3),0 1px 1px rgba(0,0,0,.4)',
                }}
                component="span"
                color="secondary"
              >
                {sizeType.size}
              </Typography>
            </div>

            <Typography
              className="font-bold mt-1"
              component="span"
              color="primary"
            >
              {sizeType.name}
            </Typography>
          </button>
        ))}
    </div>
  );
};

export default PizzaSizes;
