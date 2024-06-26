"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { SizeColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Size } from "@/types";

interface SizesClientProps {
  sizes: Size[];
}

const SizesClient = ({ sizes }: SizesClientProps) => {
  const router = useRouter();

  const formattedSizes: SizeColumn[] =
    sizes &&
    sizes?.map((size: Size) => ({
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
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push("/office/sizes/new")}>
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
