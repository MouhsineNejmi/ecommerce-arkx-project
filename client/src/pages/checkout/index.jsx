import React from 'react';
import CheckoutTable from './checkout-table.component';
import CheckoutProcess from './checkout-process.component';
import { Button } from '../../components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import CheckoutDetails from './checkout-details.component';

const CheckoutPage = () => {
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
          onClick={() => handleStepChange(2)}
        />
        <CheckoutProcess
          step={3}
          label='Order Complete'
          isActive={currentStep === 3}
          isCompleted={completedSteps.includes(3)}
          onClick={() => handleStepChange(3)}
        />
      </div>

      <div className='w-full'>
        {currentStep === 1 && <CheckoutTable />}
        {currentStep === 2 && <CheckoutDetails />}
        {currentStep === 3 && <h3>Order Complete</h3>}

        <div className='flex justify-end mt-4'>
          <Button
            className='gap-2'
            onClick={() => handleStepChange((prev) => prev + 1)}
          >
            Checkout
            <ArrowRightIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
