import OrdersClient from "./components/client";

const OrdersPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1">
        <OrdersClient />
      </div>
    </div>
  );
};

export default OrdersPage;
