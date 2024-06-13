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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertModal } from "@/components/modals/alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/shared/image-upload";

import { Category, Product, Size, Color } from "@/types";
import { ProductFormInput, productSchema } from "@/schemas/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from "@/graphql/product/product.mutation";

interface ProductFormProps {
  initialData: Product | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm = ({
  initialData,
  categories,
  sizes,
  colors,
}: ProductFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [createProduct, { loading: isCreatingProduct }] =
    useMutation(CREATE_PRODUCT);
  const [editProduct, { loading: isEditingProduct }] =
    useMutation(EDIT_PRODUCT);
  const [deleteProduct, { loading: isDeletingProduct }] =
    useMutation(DELETE_PRODUCT);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Update a product" : "Add a new product";
  const toastMessage = initialData
    ? "Product updated successfully!"
    : "Product created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          description: "",
          images: [],
          price: 0,
          category_id: "",
          color_ids: [],
          size_ids: [],
          is_featured: false,
          is_archived: false,
        },
  });

  const onSubmit = async (values: ProductFormInput) => {
    const productData = {
      name: values.name,
      description: values.description,
      images: values.images,
      store_id: params.storeId,
      price: values.price,
      size_ids: values.size_ids,
      color_ids: values.color_ids,
      is_featured: values.is_featured,
      is_archived: values.is_archived,
      category_id: values.category_id,
    };

    try {
      if (initialData) {
        await editProduct({
          variables: {
            _set: productData,
            where: {
              id: { _eq: initialData?.id },
              store_id: { _eq: params.storeId },
            },
          },
        });
      } else {
        await createProduct({
          variables: {
            object: productData,
          },
        });
      }

      router.push(`/office/${params.storeId}/products`);
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
      await deleteProduct({
        variables: {
          where: {
            id: { _eq: initialData?.id },
            store_id: { _eq: params.storeId },
          },
        },
      });
      router.push(`/office/${params.storeId}/products`);
      toast({ title: "Product deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const loading = isCreatingProduct || isEditingProduct || isDeletingProduct;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingProduct}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={isDeletingProduct}
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      values={field.value.map((image) => image)}
                      disabled={loading}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (currentImg) => currentImg !== url,
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="99.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Sizes:</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      className="flex justify-start gap-2"
                      onValueChange={field.onChange}
                    >
                      {sizes?.map((size) => (
                        <ToggleGroupItem key={size.id} value={size.id}>
                          {size.value}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Colors:</FormLabel>

                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      variant="outline"
                      className="flex justify-start gap-2"
                      onValueChange={field.onChange}
                    >
                      {colors?.map((color) => (
                        <ToggleGroupItem key={color.id} value={color.id}>
                          <div className="flex items-center gap-1">
                            <div
                              className="h-5 w-5 rounded-full border"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 !mt-0 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_archived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 !mt-0 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere on the store
                    </FormDescription>
                  </div>
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

export default ProductForm;
