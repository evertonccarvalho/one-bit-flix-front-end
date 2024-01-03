// import "@splidejs/react/dist/css/splide.min.css";
import Link from "next/link";
import styles from "./styles.module.scss";
import { CourseType } from "@/src/services/courseService";

interface props {
  course: CourseType;
}

export default function SlideCard({ course }: props) {
  return (
    <>
      <Link href={`/course/${course.id}`}>
        <div className={styles.slide}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.slideImg}
          />
          <div className={styles.slideTextArea}>
            <p className={styles.slideTitle}>{course.name}</p>
            <p className={styles.slideDescription}>{course.synopsis}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
