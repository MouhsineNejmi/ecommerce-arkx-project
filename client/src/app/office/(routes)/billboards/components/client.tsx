"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { BillboardColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Billboard } from "@/types";

interface BillboardsClientProps {
  billboards: Billboard[];
}

const BillboardsClient = ({ billboards }: BillboardsClientProps) => {
  const router = useRouter();

  const formattedBillboards: BillboardColumn[] =
    billboards &&
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
        <Button onClick={() => router.push("/office/billboards/new")}>
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
