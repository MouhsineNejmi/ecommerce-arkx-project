"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

import {
  createCategory,
  editCategory,
  deleteCategory,
} from "@/actions/categories/actions";

import { Category } from "@/types";
import { CategoryFormInput, categorySchema } from "@/schemas/category";

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const access_token = session?.access_token as string;

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      icon: "",
    },
  });

  const onSubmit = async (values: CategoryFormInput) => {
    setIsLoading(true);

    const categoryData = {
      name: values.name,
      icon: values.icon,
    };

    try {
      if (initialData) {
        await editCategory(initialData?.id, categoryData, access_token);
      } else {
        await createCategory(categoryData, access_token);
      }

      router.push("/office/categories");
      toast({ title: toastMessage });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong.", variant: "destructive" });
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCategory(initialData?.id as string, access_token);

      toast({ title: "Category deleted." });
      router.push("/office/categories");
    } catch (error) {
      toast({
        title: "Make sure you removed all products and categories first.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isLoading}
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
                      disabled={isLoading}
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
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category icon"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
