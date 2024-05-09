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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

import { Category } from "@/types/category.types";
import { Billboard } from "@/types/billboard.types";
import { CategoryFormInput, categorySchema } from "@/schemas/category";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from "@/graphql/category/category.mutation";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [createCategory, { loading: isCreatingCategory }] =
    useMutation(CREATE_CATEGORY);
  const [editCategory, { loading: isEditingCategory }] =
    useMutation(EDIT_CATEGORY);
  const [deleteCategory, { loading: isDeletingCategory }] =
    useMutation(DELETE_CATEGORY);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Update a category" : "Add a new category";
  const toastMessage = initialData
    ? "Category updated successfully!"
    : "Category created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      billboard_id: "",
    },
  });

  const onSubmit = async (values: CategoryFormInput) => {
    const categoryData = {
      name: values.name,
      billboard_id: values.billboard_id,
      store_id: params.storeId,
    };

    try {
      if (initialData) {
        await editCategory({
          variables: {
            _set: categoryData,
            where: {
              id: { _eq: initialData?.id },
              store_id: { _eq: params.storeId },
            },
          },
        });
      } else {
        await createCategory({
          variables: {
            object: categoryData,
          },
        });
      }

      router.push(`/office/${params.storeId}/categories`);
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
      await deleteCategory({
        variables: {
          where: {
            id: { _eq: initialData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });

      router.push(`/office/${params.storeId}/categories`);
      toast({ title: "Category deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products and categories first.",
      });
    }
  };

  const loading = isCreatingCategory || isEditingCategory || isDeletingCategory;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingCategory}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isDeletingCategory}
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboard_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CategoryForm;
