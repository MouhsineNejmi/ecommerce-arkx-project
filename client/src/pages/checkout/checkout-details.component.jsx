import { Elements } from '@stripe/react-stripe-js';

import getStripe from '../../lib/getStripe';

import CheckoutFormComponent from './checkout-form.component';

const CheckoutDetails = () => {
  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise}>
      <div className='w-2/3'>
        <CheckoutFormComponent />
      </div>
    </Elements>
  );
};

export default CheckoutDetails;
