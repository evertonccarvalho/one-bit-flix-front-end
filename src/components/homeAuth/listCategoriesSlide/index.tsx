import categoriesService from "@/src/services/categoriesServices";
import style from "@/styles/slideCategory.module.scss";
import SlideComponent from "../../commom/slideComponent";
import useSWR from "swr";
import PageSpinner from "../../commom/spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

export default function ListCategoriesSlide({
  categoryId,
  categoryName,
}: props) {
  const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }
  return (
    <>
      <p className={style.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  );
}
