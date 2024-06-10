import { OrderWithOrderItem } from "@/types";
import getOrders from "./get-orders";

const getTotalRevenue = async (storeId: string): Promise<number> => {
  const orders: OrderWithOrderItem[] = await getOrders(storeId);

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.items.reduce((orderSum, item) => {
      return orderSum + item.product.price * item.quantity;
    }, 0);

    return orderTotal + total;
  }, 0);

  return totalRevenue;
};

export default getTotalRevenue;
