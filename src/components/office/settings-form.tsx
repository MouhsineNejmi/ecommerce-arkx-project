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
import { useToast } from "@/components/ui/use-toast";

import { Store } from "@/types/store.types";
import { SettingsFormInput, editStoreSchema } from "@/schemas/store";
import { EDIT_STORE, DELETE_STORE } from "@/graphql/store/store.mutation";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [editStore, { loading: isEditingStore, error: editStoreErrors }] =
    useMutation(EDIT_STORE);
  const [deleteStore, { loading: isDeletingStore, error: deleteStoreErrors }] =
    useMutation(DELETE_STORE);

  const form = useForm<SettingsFormInput>({
    resolver: zodResolver(editStoreSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingsFormInput) => {
    const storeData = {
      name: values.name,
    };

    try {
      await editStore({
        variables: {
          _set: storeData,
          where: {
            id: { _eq: initialData.id },
            user_id: { _eq: session?.user?.id },
          },
        },
      });
      // router.refresh();
      toast({ title: "Store updated." });
    } catch (error) {
      if (error instanceof ApolloError) {
        if (error.message.includes("Uniqueness violation")) {
          toast({ title: "Store with that name already exists!" });
        }
      } else {
        console.log(error);
        toast({ title: "Something went wrong.", variant: "destructive" });
      }
    }
  };

  const onDelete = async () => {
    try {
      await deleteStore({
        variables: {
          where: {
            id: { _eq: initialData.id },
            user_id: { _eq: session?.user?.id },
          },
        },
      });
      router.push("/");
      toast({ title: "Store deleted." });
    } catch (error) {
      console.log(error);

      toast({
        title: "Make sure you removed all products and categories first.",
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isDeletingStore}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          disabled={isDeletingStore}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isEditingStore}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isEditingStore} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
