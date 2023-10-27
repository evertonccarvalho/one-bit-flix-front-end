import styles from "@/styles/slideCategory.module.scss";
import courseService from "@/src/services/courseService";
import useSWR from "swr";
import SlideComponent from "../../commom/slideComponent";
import { Container } from "reactstrap";
export default function NewestCategory() {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data)
    return (
      <>
        <p>Loading...</p>
      </>
    );
  return (
    <>
      <Container className="align-items-center">
        <p className={styles.titleCategory}>Lançamentos</p>
        <SlideComponent course={data.data} />
      </Container>
    </>
  );
}
