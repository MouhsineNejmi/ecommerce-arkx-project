"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Boxes,
  Layers,
  PackageSearch,
  Paintbrush,
  PanelsTopLeft,
  PencilRuler,
  Settings,
  Presentation,
  Shirt,
  PanelLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

const Sidebar = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/office/${params.storeId}`,
      label: "Overview",
      icon: PanelsTopLeft,
      active: pathname === `/office/${params.storeId}`,
    },
    {
      href: `/office/${params.storeId}/billboards`,
      label: "Billboards",
      icon: Presentation,
      active: pathname === `/office/${params.storeId}/billboards`,
    },
    {
      href: `/office/${params.storeId}/categories`,
      label: "Categories",
      icon: Layers,
      active: pathname === `/office/${params.storeId}/categories`,
    },
    {
      href: `/office/${params.storeId}/sizes`,
      label: "Sizes",
      icon: PencilRuler,
      active: pathname === `/office/${params.storeId}/sizes`,
    },
    {
      href: `/office/${params.storeId}/colors`,
      label: "Colors",
      icon: Paintbrush,
      active: pathname === `/office/${params.storeId}/colors`,
    },
    {
      href: `/office/${params.storeId}/products`,
      label: "Products",
      icon: PackageSearch,
      active: pathname === `/office/${params.storeId}/products`,
    },
    {
      href: `/office/${params.storeId}/orders`,
      label: "Orders",
      icon: Boxes,
      active: pathname === `/office/${params.storeId}/orders`,
    },
  ];

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 z-10 gap-10 hidden w-60 flex-col p-4 border-r bg-background md:flex",
          className,
        )}
      >
        <Link
          href="/"
          className="group mt-8 flex shrink-0 items-center gap-2 rounded-full text-lg font-semibold md:text-base"
        >
          <div className="w-8 h-8 rounded-full p-2 flex items-center bg-primary text-white">
            <Shirt className="h-6 w-6 rounded-full transition-all group-hover:scale-110" />
          </div>
          <h4 className="hidden md:block">Ecommerce App</h4>
        </Link>

        <nav className="flex flex-col justify-center gap-6">
          {routes.map(({ href, active, label, icon: Icon }, index) => (
            <Link
              key={index}
              href={href}
              className={cn(
                "flex items-center rounded-lg space-x-2 px-2 text-muted-foreground transition-colors hover:text-foreground",
                active
                  ? "text-black font-bold dark:text-white"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <h4>{label}</h4>
            </Link>
          ))}
        </nav>

        <nav className="mt-auto flex flex-col justify-center gap-4 px-2 py-4">
          <Link
            href={`/office/${params.storeId}/settings`}
            className={cn(
              "flex items-center space-x-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground",
              pathname === `/office/${params.storeId}/settings`
                ? "text-black font-bold dark:text-white"
                : "text-muted-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
            <h4>Settings</h4>
          </Link>
        </nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="md:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Shirt className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Ecommerce App</span>
            </Link>

            {routes.map(({ href, active, label, icon: Icon }, index) => (
              <Link
                key={index}
                href={href}
                className={cn(
                  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                  active
                    ? "text-black font-bold dark:text-white"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <h4>{label}</h4>
              </Link>
            ))}

            <Link
              href={`/${params.storeId}/settings`}
              className={cn(
                "flex items-center gap-4 space-x-2 px-2.5 text-muted-foreground hover:text-foreground",
                pathname === `/office/${params.storeId}/settings`
                  ? "text-black font-bold dark:text-white"
                  : "text-muted-foreground",
              )}
            >
              <Settings className="h-5 w-5" />
              <h4>Settings</h4>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
