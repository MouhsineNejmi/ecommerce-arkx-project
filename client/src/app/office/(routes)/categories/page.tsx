import CategoriesClient from "./components/client";

import { getCategories } from "@/actions/categories/queries";
import { Category } from "@/types";

const CategoriesPage = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="flex flex-col">
      <CategoriesClient categories={categories} />
    </div>
  );
};

export default CategoriesPage;
