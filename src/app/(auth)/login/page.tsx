"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginForm, loginSchema } from "@/schemas/auth";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);

    try {
      const loginCredentials = {
        email: values.email,
        password: values.password,
      };

      const login = await signIn("credentials", {
        ...loginCredentials,
        redirect: false,
      });

      if (!login?.ok && login?.status === 401) {
        toast({
          title:
            "Unathorized! Only sellers or admins can access the dashboard.",
          variant: "destructive",
        });
      }

      setLoading(false);

      toast({
        title: "Logged In Successfully!",
        variant: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 300);
    } catch (error) {
      setLoading(false);

      if (typeof error === "string") {
        toast({ title: error, variant: "destructive" });
      }

      toast({ title: error as any });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center py-12 gap-4"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to login
            </p>
          </div>

          <div className="grid gap-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Page;
