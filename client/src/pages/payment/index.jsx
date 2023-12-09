import PaymentTableComponent from './payment-table';
import { useGetAllPaymentsQuery } from '../../app/api/payment.api';

const PaymentPage = () => {
  const { data: payments, isLoading: isLoadingPayments } =
    useGetAllPaymentsQuery();

  // console.log(payments);

  return (
    <div>
      <h1>Payment</h1>
      {!isLoadingPayments && <PaymentTableComponent payments={payments} />}
    </div>
  );
};

export default PaymentPage;
