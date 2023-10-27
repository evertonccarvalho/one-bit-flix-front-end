import courseService from "@/src/services/courseService";
import styles from "@/styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "../../commom/slideComponent";
import { Container } from "reactstrap";

export default function FeaturedCategory() {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <Container className=" align-items-center">
        <p className={styles.titleCategory}>Em Destaque</p>
        <SlideComponent course={data.data} />
      </Container>
    </>
  );
}
