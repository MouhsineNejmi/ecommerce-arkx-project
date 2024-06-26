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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { createSize, editSize, deleteSize } from "@/actions/sizes/actions";

import { Size } from "@/types";
import { SizeFormInput, sizeSchema } from "@/schemas/size";

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm = ({ initialData }: SizeFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Update a size" : "Add a new size";
  const toastMessage = initialData
    ? "Size updated successfully!"
    : "Size created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const access_token = session?.access_token as string;

  const form = useForm<SizeFormInput>({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: SizeFormInput) => {
    setIsLoading(true);

    const sizeData = {
      name: values.name,
      value: values.value,
    };

    try {
      if (initialData) {
        await editSize(initialData?.id, sizeData, access_token);
      } else {
        await createSize(sizeData, access_token);
      }

      toast({ title: toastMessage });
      router.push("/office/sizes");
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
      await deleteSize(initialData?.id as string, access_token);
      toast({ title: "Size deleted." });
      router.push("/office/sizes");
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products using this size first.",
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
                  <FormLabel>Size Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
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
                      disabled={isLoading}
                      placeholder="S, M, L..."
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

export default SizeForm;
