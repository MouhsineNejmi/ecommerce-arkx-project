"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
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
import { useToast } from "@/components/ui/use-toast";

import { Size } from "@/types";
import { SizeFormInput, sizeSchema } from "@/schemas/size";
import {
  CREATE_SIZE,
  DELETE_SIZE,
  EDIT_SIZE,
} from "@/graphql/size/size.mutation";

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm = ({ initialData }: SizeFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [createSize, { loading: isCreatingSize }] = useMutation(CREATE_SIZE);
  const [editSize, { loading: isEditingSize }] = useMutation(EDIT_SIZE);
  const [deleteSize, { loading: isDeletingSize }] = useMutation(DELETE_SIZE);

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Update a size" : "Add a new size";
  const toastMessage = initialData
    ? "Size updated successfully!"
    : "Size created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizeFormInput>({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: SizeFormInput) => {
    const sizeData = {
      name: values.name,
      value: values.value,
      store_id: params.storeId,
    };

    try {
      if (initialData) {
        await editSize({
          variables: {
            _set: sizeData,
            where: {
              id: { _eq: initialData?.id },
              store_id: { _eq: params.storeId },
            },
          },
        });
      } else {
        await createSize({
          variables: {
            object: sizeData,
          },
        });
      }

      router.push(`/office/${params.storeId}/sizes`);
      toast({ title: toastMessage });
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong.", variant: "destructive" });
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      await deleteSize({
        variables: {
          where: {
            id: { _eq: initialData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });
      router.push(`/office/${params.storeId}/sizes`);
      toast({ title: "Size deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products using this size first.",
      });
    }
  };

  const loading = isCreatingSize || isEditingSize || isDeletingSize;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingSize}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isDeletingSize}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Small, Medium, Large..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="S, M, L..."
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

export default SizeForm;
