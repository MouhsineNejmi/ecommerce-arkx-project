/* eslint-disable react/prop-types */
import { CheckIcon } from '@heroicons/react/24/outline';

const CheckoutProcess = ({ step, label, isActive, isCompleted, onClick }) => {
  return (
    <div
      className={`cursor-pointer w-72 h-14 pl-0 ${isActive && 'border-b-2'} ${
        isCompleted && 'border-b-2 border-green-400'
      }`}
      onClick={onClick}
    >
      <p
        className={`flex items-center gap-2 font-bold ${
          !isActive && 'text-[#B1B5C3]'
        } ${isCompleted && '!text-green-400'}`}
      >
        <span
          className={`${
            isActive
              ? 'bg-foreground text-background'
              : 'bg-[#B1B5C3] text-white'
          } ${
            isCompleted && '!bg-green-400'
          } flex items-center justify-center w-8 h-8 rounded-full`}
        >
          {!isCompleted ? step : <CheckIcon className='w-5 h-5 text-white' />}
        </span>{' '}
        {label}
      </p>
    </div>
  );
};

export default CheckoutProcess;
