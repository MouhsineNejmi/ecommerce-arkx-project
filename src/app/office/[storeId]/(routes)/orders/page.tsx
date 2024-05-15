import OrdersClient from "./components/client";
import getOrders from "@/actions/get-orders";

interface OrdersPageProps {
  params: { storeId: string };
}

const OrdersPage: React.FC<OrdersPageProps> = async ({ params }) => {
  const orders = await getOrders(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1">
        <OrdersClient data={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
