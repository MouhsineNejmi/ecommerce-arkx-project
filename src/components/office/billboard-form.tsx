"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApolloError, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Trash } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/shared/image-upload";
import { useToast } from "@/components/ui/use-toast";

import { Billboard } from "@/types/billboard.types";
import { BillboardFormInput, createBillboardSchema } from "@/schemas/billboard";
import {
  CREATE_BILLBOARD,
  DELETE_BILLBOARD,
  EDIT_BILLBOARD,
} from "@/graphql/billboard/billboard.mutation";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [createBillboard, { loading: isCreatingBillboard }] =
    useMutation(CREATE_BILLBOARD);
  const [editBillboard, { loading: isEditingBillboard }] =
    useMutation(EDIT_BILLBOARD);
  const [deleteBillboard, { loading: isDeletingBillboard }] =
    useMutation(DELETE_BILLBOARD);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData
    ? "Update a billboard"
    : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully!"
    : "Billboard created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(createBillboardSchema),
    defaultValues: initialData || {
      label: "",
      image_url: "",
    },
  });

  const onSubmit = async (values: BillboardFormInput) => {
    const billboardData = {
      label: values.label,
      image_url: values.image_url,
      store_id: params.storeId,
    };

    try {
      if (initialData) {
        await editBillboard({
          variables: {
            _set: billboardData,
            where: {
              id: { _eq: initialData?.id },
              store_id: { _eq: params.storeId },
            },
          },
        });
      } else {
        await createBillboard({
          variables: {
            object: billboardData,
          },
        });
      }

      router.push(`/office/${params.storeId}/billboards`);
      toast({ title: toastMessage });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong.", variant: "destructive" });
    }
  };

  const onDelete = async () => {
    try {
      await deleteBillboard({
        variables: {
          where: {
            id: { _eq: initialData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });
      router.push(`/office/${params.storeId}/billboards`);
      toast({ title: "Billboard deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products and categories first.",
      });
    }
  };

  const loading =
    isCreatingBillboard || isEditingBillboard || isDeletingBillboard;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingBillboard}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isDeletingBillboard}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-8 space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      values={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
