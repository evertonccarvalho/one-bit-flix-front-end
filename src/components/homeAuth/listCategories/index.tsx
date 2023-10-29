import categoriesService, {
  CategoryType,
} from "@/src/services/categoriesServices";

import useSWR from "swr";
import ListCategoriesSlide from "../listCategoriesSlide";
import PageSpinner from "../../commom/spinner";

export default function ListCategories() {
  const { data, error } = useSWR(
    "/listCategories",
    categoriesService.getCategories
  );

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }
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
