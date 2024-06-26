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

import { createColor, editColor, deleteColor } from "@/actions/colors/actions";

import { Color } from "@/types";
import { ColorFormInput, colorSchema } from "@/schemas/color";

interface ColorFormProps {
  initialData: Color | null;
}

const ColorForm = ({ initialData }: ColorFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Update a color" : "Add a new color";
  const toastMessage = initialData
    ? "Color updated successfully!"
    : "Color created successfully!";
  const action = initialData ? "Save changes" : "Create";

  const access_token = session?.access_token as string;

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
    };

    try {
      if (initialData) {
        await editColor(initialData?.id, colorData, access_token);
      } else {
        await createColor(colorData, access_token);
      }

      toast({ title: toastMessage });
      router.push("/office/colors");
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
      await deleteColor(initialData?.id as string, access_token);

      toast({ title: "Color deleted." });
      router.push("/office/colors");
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products using this color first.",
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
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
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
                      disabled={isLoading}
                      placeholder="#000, #fff, #800080..."
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

export default ColorForm;
