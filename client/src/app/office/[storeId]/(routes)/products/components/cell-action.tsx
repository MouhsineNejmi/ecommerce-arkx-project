"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useMutation } from "@apollo/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { ProductColumn } from "./columns";

import { DELETE_PRODUCT } from "@/graphql/product/product.mutation";

interface CellActionProps {
  rowData: ProductColumn;
}

export const CellAction = ({ rowData }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);

  const [deleteProduct, { loading: isDeletingProduct }] =
    useMutation(DELETE_PRODUCT);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Product Id copied to the clipboard" });
  };

  const onDelete = async () => {
    try {
      await deleteProduct({
        variables: {
          where: {
            id: { _eq: rowData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });

      router.refresh();
      toast({ title: "Product deleted." });
      setOpen(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Something went wrong.",
      });
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingProduct}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(rowData.id)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/office/${params.storeId}/products/${rowData?.id}`)
            }
          >
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
