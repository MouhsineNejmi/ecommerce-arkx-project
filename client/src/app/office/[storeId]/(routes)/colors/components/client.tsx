"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ColorColumn, columns } from "./columns";

import { GET_COLORS } from "@/graphql/color/color.query";

const ColorsClient = () => {
  const router = useRouter();
  const params = useParams();

  const { data: colorsData, loading } = useQuery(GET_COLORS, {
    variables: { where: { store_id: { _eq: params.storeId } } },
  });
  const colors = colorsData?.color;

  const formattedColors: ColorColumn[] =
    !loading &&
    colors?.map((color: ColorColumn) => ({
      id: color.id,
      name: color.name,
      value: color.value,
      created_at: format(color.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors(${colors?.length || 0})`}
          description="Manage Colors for your store"
        />
        <Button
          onClick={() => router.push(`/office/${params.storeId}/colors/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={formattedColors} searchKey="name" />
    </div>
  );
};

export default ColorsClient;
