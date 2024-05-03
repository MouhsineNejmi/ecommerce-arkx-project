"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";

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

import { signupSchema } from "@/schemas/auth";
import { signup } from "@/db/auth";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "store_owner",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    const response = await signup(values);

    // if (data.status === "fail") {
    //   toast({
    //     title: data.message,
    //     variant: "destructive",
    //   });
    // }

    // toast({
    //   title: data.message,
    // });
    // router.push("/dashboard");
  };

  return (
    <Form {...form}>
      {/* <section className="flex items-center justify-center py-12"></section> */}
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input id="username" placeholder="Max" {...field} />
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

            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              <FcGoogle size={16} className="mr-2" />
              Login with Google
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
