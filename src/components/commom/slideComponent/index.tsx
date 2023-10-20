import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { CourseType } from "@/src/services/courseService";
import SlideCard from "../slideCard";

interface props {
  course: CourseType[];
}

export default function SlideComponent({ course }: props) {
  let slideCount = 0;
  if (course.length > 4) {
    slideCount = 4;
  } else if (course) {
    slideCount = course.length;
  }

  return (
    <>
      <div>
        <Splide
          className="d-flex flex-column justify-content-between  py-4"
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            pagination: true,
            arrows: course.length > 4 ? true : false,
            drag: course.length > 4 ? true : false,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 600 : 300,
                arrows: course.length > 2 ? true : false,
                drag: course.length > 2 ? true : false,
              },
              600: {
                perPage: 1,
                width: 300,
                arrows: course.length > 1 ? true : false,
                drag: course.length > 1 ? true : false,
              },
              300: {
                with: 260,
              },
            },
          }}
        >
          {course?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
