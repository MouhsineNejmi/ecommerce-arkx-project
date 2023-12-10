import { Link, useParams } from 'react-router-dom';
import { ArrowPathIcon, LinkIcon } from '@heroicons/react/24/outline';

import { Badge } from '../../components/ui/badge';

import { useGetPaymentByIdQuery } from '../../app/api/payment.api';
import { paymentStatuses } from '../../data/table-data';
import { dateFormatter } from '../../helpers/dateFormatter';

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();
  const { data: payment, isLoading } = useGetPaymentByIdQuery(paymentId);

  const status =
    !isLoading &&
    paymentStatuses.find((status) => status.value === payment.status);

  console.log(payment);

  return isLoading ? (
    <ArrowPathIcon className='w-6 h-6 animate-spin' />
  ) : (
    <div>
      <div className='mb-4 flex items-center gap-2 mb-4'>
        <h2 className='text-xl font-bold'>Payment ID: {payment._id}</h2>
        {status ? (
          <div className='flex items-center'>
            {status.icon && (
              <status.icon className={`mr-1 h-4 w-4 ${status.color}`} />
            )}
            <Badge
              variant='outline'
              className={`font-medium ${status.badgeStyles}`}
            >
              {status.label}
            </Badge>
          </div>
        ) : null}
      </div>

      <div className='flex gap-4'>
        <div className='flex flex-col gap-2 bg-background rounded-xl p-8 w-1/2'>
          <h4 className='font-bold mb-2'>Payment Details:</h4>

          <div className='flex items-center justify-between gap-4'>
            <h3>Payment Date:</h3>
            <p className='text-zinc-500'>
              {dateFormatter(payment.payment_date)}
            </p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Order Id:</h3>
            <Link
              to={`/admin/orders/${payment.order_id}`}
              className='flex items-center gap-2 text-zinc-500'
            >
              <LinkIcon className='w-4 h-4 underline' />
              {payment.order_id}
            </Link>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3>Payment Method:</h3>
            <p className='text-zinc-500 capitalize'>
              {payment.payment_method === 'card'
                ? 'Credit Card'
                : payment.payment_method}
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-background rounded-xl p-8 w-1/2'>
          <h4 className='text-lg font-semibold mb-2'>Credit Card:</h4>

          <div className='flex items-center justify-between gap-4'>
            <h3 className='text-gray-600'>Card Network:</h3>
            <p className='text-gray-800 capitalize'>{payment.card.brand}</p>
          </div>

          <div className='flex items-center justify-between gap-4'>
            <h3 className='text-gray-600'>Card Number:</h3>
            <p className='text-gray-800 capitalize'>
              **** **** **** {payment.card.last4}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center justify-between gap-4'>
              <h3 className='text-gray-600'>Expiration Date:</h3>
              <p className='text-gray-800 capitalize'>
                {String(payment.card.exp_month)}/
                {String(payment.card.exp_year).slice(2)}
              </p>
            </div>

            <div className='flex items-center justify-between gap-4'>
              <h3 className='text-gray-600'>CVV:</h3>
              <p className='text-gray-800 capitalize'>***</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
