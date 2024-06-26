import CategoryForm from "@/components/office/category-form";

import { getCategory } from "@/actions/categories/queries";

interface CategoryPageProps {
  params: { categoryId: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await getCategory(params.categoryId);

  return <CategoryForm initialData={category} />;
};

export default CategoryPage;
