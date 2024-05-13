"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

import { formatter } from "@/lib/utils";

import { GET_ORDERS } from "@/graphql/order/order.query";
import { GET_ORDER_ITEMS } from "@/graphql/order/order.query";

const OrdersClient = () => {
  const params = useParams();

  const { data: ordersData, loading: loadingOrders } = useQuery(GET_ORDERS, {
    variables: { where: { store_id: { _eq: params.storeId } } },
  });
  const orders = ordersData?.order;

  const { data: orderItemsData, loading: loadingOrderItems } = useQuery(
    GET_ORDER_ITEMS,
    {
      skip: loadingOrders,
      variables: { where: { id: { _in: orders?.order_items } } },
    }
  );
  const order_items = orderItemsData?.order_item;

  console.log("orderItemsData: ", orderItemsData);

  const formattedOrders: OrderColumn[] =
    !loadingOrders &&
    orders?.map((order: any) => ({
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order_items.products
        .map((product: any) => product.name)
        .join(", "),
      total_price: formatter.format(
        order_items.reduce((total: number, item: any) => {
          return total + Number(item.product.price) * item.quantity;
        }, 0)
      ),
      status: order.status,
      created_at: format(order.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <Heading
        title={`Orders(${orders?.length || 0})`}
        description="See your store orders"
      />

      <Separator />

      <DataTable columns={columns} data={formattedOrders} searchKey="status" />
    </div>
  );
};

export default OrdersClient;
