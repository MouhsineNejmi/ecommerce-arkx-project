"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CategoryColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Category } from "@/types";

interface CategoriesClientProps {
  categories: Category[];
}

const CategoriesClient = ({ categories }: CategoriesClientProps) => {
  const router = useRouter();

  const formattedBillboards: CategoryColumn[] =
    categories &&
    categories?.map((category: Category) => ({
      id: category.id,
      label: category.name,
      created_at: format(category.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${categories?.length || 0})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push("/office/categories/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable
        columns={columns}
        data={formattedBillboards}
        searchKey="label"
      />
    </div>
  );
};

export default CategoriesClient;
