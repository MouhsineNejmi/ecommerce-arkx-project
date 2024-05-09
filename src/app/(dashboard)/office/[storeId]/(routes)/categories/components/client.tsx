"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CategoryColumn, columns } from "./columns";

import { GET_CATEGORIES } from "@/graphql/category/category.query";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types/category.types";

const CategoriesClient = () => {
  const router = useRouter();
  const params = useParams();

  const { data: categoriesData, loading } = useQuery(GET_CATEGORIES, {
    variables: {
      where: { store_id: { _eq: params.storeId } },
    },
  });
  const categories = categoriesData?.category;

  const formattedCategories: CategoryColumn[] =
    !loading &&
    categories?.map((category: Category) => ({
      id: category.id,
      name: category.name,
      billboard_label: category.billboard.label,
      created_at: format(category.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${categories?.length || 0})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() =>
            router.push(`/office/${params.storeId}/categories/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable
        columns={columns}
        data={formattedCategories}
        searchKey="name"
      />
    </div>
  );
};

export default CategoriesClient;
