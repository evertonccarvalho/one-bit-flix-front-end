import categoriesService, {
  CategoryType,
} from "@/src/services/categoriesServices";

import useSWR from "swr";
import ListCategoriesSlide from "../listCategoriesSlide";

export default function ListCategories() {
  const { data, error } = useSWR(
    "/listCategories",
    categoriesService.getCategories
  );

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <ListCategoriesSlide
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  );
}
