"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { BillboardColumn, columns } from "./columns";

import { GET_BILLBOARDS } from "@/graphql/billboard/billboard.query";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

const BillboardsClient = () => {
  const router = useRouter();
  const params = useParams();

  const { data: billboardsData, loading } = useQuery(GET_BILLBOARDS);
  const billboards = billboardsData?.billboard;

  const formattedBillboards: BillboardColumn[] =
    !loading &&
    billboards?.map((billboard: BillboardColumn) => ({
      id: billboard.id,
      label: billboard.label,
      created_at: format(billboard.created_at, "MMMM do, yyyy"),
    }));

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${billboards?.length || 0})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            router.push(`/office/${params.storeId}/billboards/new`)
          }
        >
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

export default BillboardsClient;
