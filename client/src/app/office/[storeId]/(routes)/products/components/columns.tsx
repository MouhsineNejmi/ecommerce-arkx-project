"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type ProductColumn = {
  id: string;
  name: string;
  price: number;
  category: string;
  is_featured: boolean;
  is_archived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: " is_archived",
    header: "Archived",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.is_archived ? "Archived" : "Published"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_featured",
    header: "Featured",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.is_featured ? "Featured" : "Not Featured"}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: " Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction rowData={row.original} />,
  },
];
