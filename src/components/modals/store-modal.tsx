"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/modals/modal";

import { useStoreModal } from "@/hooks/use-store-modal";
import { CreateStoreInput, createStoreSchema } from "@/schemas/store";
import { CREATE_STORE } from "@/graphql/store/store.mutation";

const StoreModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const storeModal = useStoreModal();
  const { data: session } = useSession();
  const [createStore, { data, loading, error }] = useMutation(CREATE_STORE);

  const form = useForm({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      user_id: "",
    },
  });

  const onSubmit = async (values: CreateStoreInput) => {
    try {
      const storeData = {
        name: values.name,
        user_id: session?.user?.id,
      };

      await createStore({ variables: { object: storeData } });

      const store = await data?.insert_store_one;

      if (store) {
        toast({ title: "Store Created Successfully!" });
        form.reset();
        storeModal.onClose();

        router.push(`/office/${data.insert_store_one.id}`);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ApolloError) {
        if (error.message.includes("Uniqueness violation")) {
          toast({ title: "Store with that name already exists!" });
        }
      } else {
        toast({ title: "Something went wrong! Please try again later." });
      }
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      disabled={loading}
    >
      <div>
        <div className="py-2 pb-4 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="E-commerce"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
