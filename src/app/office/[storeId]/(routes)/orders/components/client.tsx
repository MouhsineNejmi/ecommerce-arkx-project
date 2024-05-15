"use client";

import { format } from "date-fns";

import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

import { formatter } from "@/lib/utils";

import { OrderItemWithProduct, OrderWithOrderItem } from "@/types";

interface OrdersClientProps {
  data: OrderWithOrderItem[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  const formattedOrders: OrderColumn[] = data?.map(
    (order: OrderWithOrderItem) => ({
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order?.items
        .map((item: OrderItemWithProduct) => item.product.name)
        .join(", "),
      total_price: formatter.format(order.amount),
      status: order.status,
      created_at: format(order.created_at, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="grid gap-6">
      <Heading
        title={`Orders(${data?.length || 0})`}
        description="See your store orders"
      />

      <Separator />

      <DataTable columns={columns} data={formattedOrders} searchKey="status" />
    </div>
  );
};

export default OrdersClient;
