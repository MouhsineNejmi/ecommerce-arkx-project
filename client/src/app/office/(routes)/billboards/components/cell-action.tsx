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
import { BillboardColumn } from "./columns";
import { deleteBillboard } from "@/actions/billboards/actions";

interface CellActionProps {
  rowData: BillboardColumn;
}

export const CellAction = ({ rowData }: CellActionProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [isDeletingBillboard, setIsDeletingBillboard] =
    useState<boolean>(false);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Billboard Id copied to the clipboard" });
  };

  const onDelete = async () => {
    setIsDeletingBillboard(true);

    try {
      await deleteBillboard(rowData?.id, session?.access_token!);

      toast({ title: "Billboard deleted." });
      router.refresh();
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products and categories first.",
      });
    } finally {
      setOpen(false);
      setIsDeletingBillboard(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingBillboard}
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
            onClick={() => router.push(`/office/billboards/${rowData?.id}`)}
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
