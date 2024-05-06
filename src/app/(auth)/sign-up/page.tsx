"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useToast } from "@/components/ui/use-toast";

import { signupSchema } from "@/schemas/auth";
import { SignupUserInput } from "@/types/auth.types";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      role: "customer",
    },
  });

  const onSubmit = async (values: SignupUserInput) => {
    setLoading(true);

    try {
      const userData: SignupUserInput = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        role: values.role,
        password: values.password,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ ...userData }),
        }
      );
      const { user } = await res.json();
      setLoading(false);

      if (user.errors) {
        user.errors.map((error: any) => {
          if (error?.message?.includes("Uniqueness violation"))
            toast({
              title: "Username or email already exists!",
              variant: "destructive",
            });

          toast({
            title: error?.message,
            variant: "destructive",
          });
        });
      }

      toast({
        title: "Account Created Successfully!",
        variant: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 300);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center py-12"
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                    <FormControl>
                      <Input id="first_name" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                    <FormControl>
                      <Input id="last_name" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input id="username" placeholder="john.doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
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
              Create an account
            </Button>

            <Button variant="outline" className="w-full" disabled={loading}>
              Login with Google
            </Button>

            <div className="mt-2 text-center text-sm">
              Already have have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Page;
