"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { SizeColumn, columns } from "./columns";

import { GET_SIZES } from "@/graphql/size/size.query";

const SizesClient = () => {
  const router = useRouter();
  const params = useParams();

  const { data: sizesData, loading } = useQuery(GET_SIZES, {
    variables: { where: { store_id: { _eq: params.storeId } } },
  });
  const sizes = sizesData?.size;

  const formattedSizes: SizeColumn[] =
    !loading &&
    sizes?.map((size: SizeColumn) => ({
      id: size.id,
      name: size.name,
      value: size.value,
      created_at: format(size.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes(${sizes?.length || 0})`}
          description="Manage Sizes for your store"
        />
        <Button
          onClick={() => router.push(`/office/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={formattedSizes} searchKey="name" />
    </div>
  );
};

export default SizesClient;
