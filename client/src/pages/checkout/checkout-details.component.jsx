/* eslint-disable react/prop-types */
import { Elements } from '@stripe/react-stripe-js';

import getStripe from '../../lib/getStripe';

import CheckoutFormComponent from './checkout-form.component';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CheckoutDetails = ({ handleStepChange }) => {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <div className='w-full'>
        <Link
          onClick={() => handleStepChange(1)}
          className='flex items-center gap-2 text-zinc-500'
        >
          <ArrowLeftIcon className='w-4 h-4' />
          Go back
        </Link>
        <CheckoutFormComponent handleStepChange={handleStepChange} />
      </div>
    </Elements>
  );
};

export default CheckoutDetails;
