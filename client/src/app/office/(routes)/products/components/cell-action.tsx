"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

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

import { deleteProduct } from "@/actions/products/actions";

interface CellActionProps {
  rowData: ProductColumn;
}

export const CellAction = ({ rowData }: CellActionProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState<boolean>(false);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Color Id copied to the clipboard" });
  };

  const onDelete = async () => {
    setIsDeletingProduct(true);

    try {
      await deleteProduct(rowData?.id, session?.access_token!);

      toast({ title: "Product deleted." });
      router.refresh();
    } catch (error) {
      console.log(error);

      toast({
        title: "Something went wrong!",
      });
    } finally {
      setOpen(false);
      setIsDeletingProduct(false);
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
            onClick={() => router.push(`/office/products/${rowData?.id}`)}
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
