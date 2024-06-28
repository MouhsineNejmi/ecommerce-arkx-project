"use client";

import React from "react";
import { CircleMinus, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Size, Color, ProductVariant } from "@/types";

interface ProductVariantFormProps {
  sizes: Size[];
  colors: Color[];
  variants: ProductVariant[];
  setVariants: React.Dispatch<React.SetStateAction<ProductVariant[]>>;
}

const ProductVariantForm = ({
  sizes,
  colors,
  variants,
  setVariants,
}: ProductVariantFormProps) => {
  const addVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const newVariant = {
      id: `${Date.now()}`,
      color_id: colors[0]?.id || "",
      size_id: sizes[0]?.id || "",
    };
    setVariants([...variants, newVariant]);
  };

  const updateVariant = (
    id: string,
    key: keyof ProductVariant,
    value: string
  ) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [key]: value } : variant
      )
    );
  };

  const deleteVariant = (id: string) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
        <CardDescription>Add your product variants</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {variants?.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>
                  <ToggleGroup
                    type="single"
                    value={variant.size_id}
                    onValueChange={(value) =>
                      updateVariant(variant.id, "size_id", value)
                    }
                    variant="outline"
                  >
                    {sizes?.map((size) => (
                      <ToggleGroupItem key={size.id} value={size.id}>
                        {size.value}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </TableCell>
                <TableCell>
                  <ToggleGroup
                    type="single"
                    value={variant.color_id}
                    onValueChange={(value) =>
                      updateVariant(variant.id, "color_id", value)
                    }
                    variant="outline"
                  >
                    {colors?.map((color) => (
                      <ToggleGroupItem key={color.id} value={color.id}>
                        {color.name}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleMinus
                          className="h-4 w-4 cursor-pointer text-red-500"
                          onClick={() => deleteVariant(variant.id)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Product Variant</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={addVariant}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductVariantForm;
