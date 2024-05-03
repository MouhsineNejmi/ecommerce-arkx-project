import Image from "next/image";
import SignupForm from "@/components/auth/signup-form";

const Page = () => {
  return (
    <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <SignupForm />

      <section className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </section>
    </main>
  );
};

export default Page;
