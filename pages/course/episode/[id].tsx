import HeaderGeneric from "@/src/components/commom/headerGeneric";
import PageSpinner from "@/src/components/commom/spinner";
import courseService, { CourseType } from "@/src/services/courseService";
import styles from "@/styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";
export default function EpisodePlayer() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();

  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const getCourse = async function () {
    if (typeof courseId !== "string") return;
    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(`/course/episode/${episodeOrder - 1}?courseid=${course?.id}`);
  };
  const handleNextEpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseid=${course?.id}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>OneBitFlix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric logoUrl="/home" btnContent={"Voltar para o curso"} btnUrl={`/course/${courseId}`} />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>{course.episodes[episodeOrder].name}</p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              width="100%"
              height="auto"
              clasname={styles.player}
              url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              onClick={handleLastEpisode}
              className={styles.episodeButton}
              disabled={episodeOrder === 0 ? true : false}
            >
              <img className={styles.arrowImg} src="/episode/iconArrowLeft.svg" alt="setaEsquerda" />
            </Button>
            <Button
              onClick={handleNextEpisode}
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length ? true : false}
            >
              <img className={styles.arrowImg} src="/episode/iconArrowRight.svg" alt="setaDireita" />
            </Button>
          </div>
          <p className="text-center py-4">{course.episodes[episodeOrder].synopsis}</p>
        </Container>
      </main>
    </>
  );
}
