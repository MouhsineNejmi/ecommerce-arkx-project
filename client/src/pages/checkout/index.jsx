import React from 'react';
import { useSelector } from 'react-redux';

import CheckoutProcess from './checkout-process.component';
import CheckoutTable from './checkout-table.component';
import CheckoutDetails from './checkout-details.component';

import { cartSelector, selectTotalAmount } from '../../app/features/cart.slice';

const CheckoutPage = () => {
  const cart = useSelector(cartSelector);
  const totalAmount = useSelector(selectTotalAmount);

  const [currentStep, setCurrentStep] = React.useState(1);
  const [completedSteps, setCompletedSteps] = React.useState([]);

  const handleStepChange = (step) => {
    setCompletedSteps(() =>
      Array.from({ length: step - 1 }, (_, index) => index + 1)
    );

    setCurrentStep(step);
  };

  return (
    <div className='custom-container my-32'>
      <h1 className='font-bold text-2xl text-center my-4'>Checkout Page</h1>
      <div className='my-10 flex justify-center gap-8'>
        <CheckoutProcess
          step={1}
          label='Shopping Cart'
          isActive={currentStep === 1}
          isCompleted={completedSteps.includes(1)}
          onClick={() => handleStepChange(1)}
        />
        <CheckoutProcess
          step={2}
          label='Checkout Details'
          isActive={currentStep === 2}
          isCompleted={completedSteps.includes(2)}
          onClick={() => handleStepChange(cart.items ? 2 : 1)}
        />
        <CheckoutProcess
          step={3}
          label='Order Complete'
          isActive={currentStep === 3}
          isCompleted={completedSteps.includes(3)}
          onClick={() => handleStepChange(cart.items ? 3 : 1)}
        />
      </div>

      <div className='w-full'>
        {currentStep === 1 && (
          <CheckoutTable
            cart={cart}
            totalAmount={totalAmount}
            handleStepChange={handleStepChange}
          />
        )}
        {currentStep === 2 && (
          <CheckoutDetails handleStepChange={handleStepChange} />
        )}
        {currentStep === 3 && <h1>Thank you for your order</h1>}
      </div>
    </div>
  );
};

export default CheckoutPage;
