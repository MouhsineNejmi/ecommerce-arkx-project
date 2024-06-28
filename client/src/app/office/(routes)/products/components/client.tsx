"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ProductColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Product } from "@/types";
import { formatter } from "@/lib/utils";

interface ProductsClientProps {
  products: Product[];
}

const ProductsClient = ({ products }: ProductsClientProps) => {
  const router = useRouter();

  const formattedProducts: ProductColumn[] =
    products &&
    products?.map((product: Product) => ({
      id: product.id,
      name: product.name,
      is_featured: product.is_featured,
      is_archived: product.is_archived,
      price: formatter.format(product.price),
      category: product.category?.name,
      created_at: format(product.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${products?.length || 0})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push("/office/products/new")}>
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
