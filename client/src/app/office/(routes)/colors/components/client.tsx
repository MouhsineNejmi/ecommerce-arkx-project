"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ColorColumn, columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Color } from "@/types";

interface ColorsClientProps {
  colors: Color[];
}

const ColorsClient = ({ colors }: ColorsClientProps) => {
  const router = useRouter();

  const formattedColors: ColorColumn[] =
    colors &&
    colors?.map((color: Color) => ({
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
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push("/office/colors/new")}>
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
