"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/shared/image-upload";

import {
  createBillboard,
  editBillboard,
  deleteBillboard,
} from "@/actions/billboards/actions";

import { Billboard } from "@/types";
import { BillboardFormInput, billboardSchema } from "@/schemas/billboard";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData
    ? "Update a billboard"
    : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully!"
    : "Billboard created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormInput>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialData || {
      label: "",
      image_url: "",
      user_id: session?.user.id,
    },
  });

  const onSubmit = async (values: BillboardFormInput) => {
    setLoading(true);

    const billboardData = {
      label: values.label,
      image_url: values.image_url,
      user_id: session?.user.id as string,
    };

    try {
      if (initialData) {
        await editBillboard(
          initialData?.id,
          billboardData,
          session?.access_token as string
        );
      } else {
        await createBillboard(billboardData, session?.access_token as string);
        form.reset();
      }

      toast({ title: toastMessage });
      router.push("/office/billboards");
    } catch (error) {
      console.error(error);
      toast({ title: "Something went wrong.", variant: "destructive" });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setLoading(true);

    try {
      await deleteBillboard(initialData?.id!, session?.access_token!);
      toast({ title: "Billboard deleted." });
      router.push("/office/billboards");
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
        loading={loading}
      />

      <div className="flex items-center justify-between mb-4">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={loading}
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
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    is_banner
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

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
