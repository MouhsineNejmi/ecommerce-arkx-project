import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY;
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;
