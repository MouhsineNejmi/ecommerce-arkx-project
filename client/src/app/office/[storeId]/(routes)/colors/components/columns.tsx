"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  created_at: Date;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
        {row.original.value}
      </div>
    ),
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
