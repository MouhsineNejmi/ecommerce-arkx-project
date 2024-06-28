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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/shared/image-upload";
import ProductVariantForm from "@/components/office/product-variant-form";

import { Category, Product, Size, Color, ProductVariant } from "@/types";
import { ProductFormInput, productSchema } from "@/schemas/product";
import {
  createProduct,
  editProduct,
  deleteProduct,
} from "@/actions/products/actions";
import {
  createProductVariants,
  editProductVariants,
  deleteProductVariants,
} from "@/actions/product-variant/actions";

interface ProductFormProps {
  initialData: Product | null;
  productVariants: ProductVariant[] | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm = ({
  initialData,
  productVariants,
  categories,
  sizes,
  colors,
}: ProductFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variants, setVariants] = useState<ProductVariant[]>(
    productVariants || []
  );

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Update a product" : "Add a new product";
  const toastMessage = initialData
    ? "Product updated successfully!"
    : "Product created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const access_token = session?.access_token as string;

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
          is_featured: false,
          is_archived: false,
        },
  });

  const onSubmit = async (values: ProductFormInput) => {
    setIsLoading(true);

    const productData = {
      name: values.name,
      description: values.description,
      images: values.images,
      price: values.price,
      is_featured: values.is_featured,
      is_archived: values.is_archived,
      category_id: values.category_id,
    };

    try {
      let productId: string;
      if (initialData) {
        productId = initialData?.id;
        await editProduct(initialData?.id, productData, access_token);
      } else {
        const product = await createProduct(productData, access_token);
        productId = product?.id as string;
      }

      if (productId) {
        const updatedVariants = variants.map((variant) => ({
          ...variant,
          product_id: productId,
        }));

        const variantsToUpdate = updatedVariants.filter((updatedVariant) =>
          productVariants?.some(
            (existingVariant) => existingVariant.id === updatedVariant.id
          )
        );

        const variantsToCreate = updatedVariants.filter(
          (updatedVariant) =>
            !productVariants?.some(
              (existingVariant) => existingVariant.id === updatedVariant.id
            )
        );

        const variantsToDelete = productVariants
          ?.filter(
            (existingVariant) =>
              !updatedVariants.some(
                (updatedVariant) => updatedVariant.id === existingVariant.id
              )
          )
          .map((variant) => variant.id);

        // Update existing variants
        variantsToUpdate &&
          (await Promise.all(
            variantsToUpdate.map((variant) =>
              editProductVariants(variant, access_token)
            )
          ));

        // Create new variants
        variantsToCreate &&
          (await createProductVariants(variantsToCreate, access_token));

        // Delete removed variants
        variantsToDelete &&
          (await deleteProductVariants(variantsToDelete, access_token));
      }

      toast({ title: toastMessage });
      // router.push("/office/products");
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
      await deleteProduct(initialData?.id as string, access_token);

      toast({ title: "Product deleted." });
      router.push("/office/products");
    } catch (error) {
      console.log(error);

      toast({
        title: "Something went wrong.",
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
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      values={field.value.map((image) => image)}
                      disabled={isLoading}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (currentImg) => currentImg !== url
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                    disabled={isLoading}
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

            <ProductVariantForm
              sizes={sizes}
              colors={colors}
              variants={variants}
              setVariants={setVariants}
            />

            <div className="grid grid-cols-2 gap-4">
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
          </div>

          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
