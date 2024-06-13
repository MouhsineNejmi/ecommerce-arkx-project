"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Filter from "./filter";

import { Color, Size } from "@/types";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-x-2 lg:hidden">
            Filters
            <Plus size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          {/* Render the filters */}
          <div className="p-4">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileFilters;
