import HeaderGeneric from "@/src/components/commom/headerGeneric";
import PageSpinner from "@/src/components/commom/spinner";
import courseService, { CourseType } from "@/src/services/courseService";
import watchEpisodeService from "@/src/services/episodeservice";
import styles from "@/styles/episodePlayer.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";

export default function EpisodePlayer() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState(false);
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [EpisodeTime, setEpisodeTime] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await watchEpisodeService.getWatchTime(episodeId);
    if (res.data !== null) {
      setGetEpisodeTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async () => {
    await watchEpisodeService.setWatchTime({
      episodeId: episodeId,
      seconds: Math.round(EpisodeTime),
    });
  };

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  };

  if (isReady === true) {
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3);
  }

  useEffect(() => {
    handleGetEpisodeTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getCourse = async function () {
    if (typeof courseId !== "string") return;
    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handleLastEpisode = () => {
    router.push(`/course/episode/${episodeOrder - 1}?courseid=${course?.id}&episodeid=${episodeId - 1}`);
  };
  const handleNextEpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseid=${course?.id}&episodeid=${episodeId + 1}`);
  };

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (course?.episodes === undefined) return <PageSpinner />;

  if (episodeOrder + 1 < course?.episodes?.length) {
    if (Math.round(EpisodeTime) === course.episodes[episodeOrder].secondsLong) {
      handleNextEpisode();
    }
  }

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
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(process) => {
                setEpisodeTime(process.playedSeconds);
              }}
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