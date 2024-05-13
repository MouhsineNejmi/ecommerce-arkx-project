"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./columns";

import { GET_PRODUCTS } from "@/graphql/product/product.query";
import { formatter } from "@/lib/utils";
import { Product } from "@/types";

const ProductsClient = () => {
  const router = useRouter();
  const params = useParams();

  const { data: productsData, loading } = useQuery(GET_PRODUCTS, {
    variables: { where: { store_id: { _eq: params.storeId } } },
  });
  const products = productsData?.product;

  const formattedProducts: ProductColumn[] =
    !loading &&
    products?.map((product: Product) => ({
      id: product.id,
      name: product.name,
      is_featured: product.is_featured,
      is_archived: product.is_archived,
      price: formatter.format(product.price),
      category: product.category.name,
      created_at: format(product.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${products?.length || 0})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/office/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={formattedProducts} searchKey="name" />
    </div>
  );
};

export default ProductsClient;
