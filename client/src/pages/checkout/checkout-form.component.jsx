/* eslint-disable react/prop-types */
import React from 'react';

import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import {
  useCreatePaymentIntentMutation,
  useCreatePaymentMutation,
} from '../../app/api/payment.api';
import { useCreateOrderMutation } from '../../app/api/orders.api';
import { useGetMyProfileDataQuery } from '../../app/api/users.api';
import { useClearCartMutation } from '../../app/api/cart.api';
import { cartSelector, selectTotalAmount } from '../../app/features/cart.slice';

import { CheckoutValidation } from '../../lib/validation/checkout';

import { Button } from '../../components/ui/button';
import FormInput from '../../components/form-input.component';

const CheckoutFormComponent = ({ handleStepChange }) => {
  const cart = useSelector(cartSelector);
  const totalAmount = useSelector(selectTotalAmount);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [clearCart] = useClearCartMutation();
  const { data: customer } = useGetMyProfileDataQuery();

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CheckoutValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      street_address: '',
      country: '',
      city: '',
      state: '',
    },
  });

  const onSubmit = async (values) => {
    if (!stripe || !elements) {
      return;
    }

    const billingDetails = {
      name: `${values.first_name} ${values.last_name}`,
      email: values.email,
      address: {
        city: values.city,
        line1: values.street_address,
        state: values.state,
      },
    };

    const { data: client_secret } = await createPaymentIntent(
      Math.floor(totalAmount)
    );

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    const confirmCardPayment = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });

    // console.log('paymentMethod: ', paymentMethodReq);
    // console.log('confirmCardPayment: ', confirmCardPayment);

    if (paymentMethodReq.error) {
      setMessage(paymentMethodReq.error.message);
    } else if (
      paymentMethodReq &&
      confirmCardPayment.paymentIntent.status === 'succeeded'
    ) {
      const { data: order } = await createOrder({
        customer_id: customer._id,
        order_items: cart,
        total: totalAmount,
        delivery_status: 'Pending',
        shipping: paymentMethodReq.paymentMethod.billing_details,
      });

      await createPayment({
        order_id: order._id,
        amount: confirmCardPayment.paymentIntent.amount,
        payment_date: confirmCardPayment.paymentIntent.created,
        payment_method: paymentMethodReq.paymentMethod.type,
        card: paymentMethodReq.paymentMethod.card,
        status: 'Completed',
      });

      handleStepChange(3);
      await clearCart();
      setMessage('Payment successful!');
    } else {
      setMessage('Unexpected state');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className='text-green-500 mb-10'>{message}</p>

      {/* Contact Information */}
      <div className='border border-zinc-300 p-6 py-8 mb-8'>
        <h3 className='font-semibold mb-4'>Contact Information</h3>
        <div className='flex gap-4'>
          <FormInput
            name='first_name'
            customLabel='First Name'
            placeholder='First Name'
            control={control}
            className='w-1/2'
          />
          {errors.first_name && (
            <p className='text-red-500'>{errors.first_name.message}</p>
          )}

          <FormInput
            name='last_name'
            customLabel='Last Name'
            placeholder='Last name'
            className='w-1/2'
            control={control}
          />
        </div>

        <FormInput
          type='tel'
          name='phone'
          customLabel='Phone Number'
          placeholder='Phone Number'
          control={control}
        />

        <FormInput
          type='email'
          name='email'
          customLabel='Email Address'
          placeholder='Your Email'
          control={control}
        />
      </div>
      <div className='border border-zinc-300 p-6 py-8 mb-8'>
        <h3 className='font-semibold mb-4'>Shipping Address</h3>

        <FormInput
          name='street_address'
          customLabel='Street Address'
          placeholder='Street Address'
          control={control}
        />

        <FormInput
          name='country'
          customLabel='Country'
          placeholder='Your Country'
          control={control}
        />
        {errors.country && (
          <p className='text-red-500'>{errors.country.message}</p>
        )}

        <FormInput
          name='city'
          customLabel='City'
          placeholder='Town / City'
          control={control}
        />
        {errors.city && <p className='text-red-500'>{errors.city.message}</p>}

        <div className='flex gap-4'>
          <FormInput
            name='state'
            className='w-1/2'
            customLabel='State'
            placeholder='State'
            control={control}
          />

          <FormInput
            name='zip_code'
            className='w-1/2'
            customLabel='Zip Code'
            placeholder='Zip Code'
            control={control}
          />
        </div>
      </div>

      <div className='border border-zinc-300 p-6 py-8 mb-8'>
        <CardElement />
      </div>

      <Button className='w-full' type='submit' disabled={isProcessing}>
        {isProcessing && <Loader2 className='animate-spin' />}
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

export default CheckoutFormComponent;
