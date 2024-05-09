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

import { Color } from "@/types";
import { ColorFormInput, colorSchema } from "@/schemas/color";
import {
  CREATE_COLOR,
  DELETE_COLOR,
  EDIT_COLOR,
} from "@/graphql/color/color.mutation";

interface ColorFormProps {
  initialData: Color | null;
}

const ColorForm = ({ initialData }: ColorFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [createColor, { loading: isCreatingColor }] = useMutation(CREATE_COLOR);
  const [editColor, { loading: isEditingColor }] = useMutation(EDIT_COLOR);
  const [deleteColor, { loading: isDeletingColor }] = useMutation(DELETE_COLOR);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Update a color" : "Add a new color";
  const toastMessage = initialData
    ? "Color updated successfully!"
    : "Color created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ColorFormInput>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: ColorFormInput) => {
    const colorData = {
      name: values.name,
      value: values.value,
      store_id: params.storeId,
    };

    try {
      if (initialData) {
        await editColor({
          variables: {
            _set: colorData,
            where: {
              id: { _eq: initialData?.id },
              store_id: { _eq: params.storeId },
            },
          },
        });
      } else {
        await createColor({
          variables: {
            object: colorData,
          },
        });
      }

      router.push(`/office/${params.storeId}/colors`);
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
      await deleteColor({
        variables: {
          where: {
            id: { _eq: initialData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });
      router.push(`/office/${params.storeId}/colors`);
      toast({ title: "Color deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products using this color first.",
      });
    }
  };

  const loading = isCreatingColor || isEditingColor || isDeletingColor;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingColor}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isDeletingColor}
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
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Black, White, Purple..."
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
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="#000, #fff, #800080..."
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

export default ColorForm;
