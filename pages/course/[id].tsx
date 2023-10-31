import HeaderAuth from "@/src/components/commom/headerAuth";
import Head from "next/head";
import courseService, { CourseType } from "@/src/services/courseService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Footer from "@/src/components/commom/footer";
import { Button, Container } from "reactstrap";
import styles from "@/styles/coursePage.module.scss";
import PageSpinner from "@/src/components/commom/spinner";
import EpisodeList from "@/src/components/episodeList";

export default function CoursePage() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const getCourse = async function () {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorited(res.data.favorited);
    }
  };

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;

    if (liked === true) {
      await courseService.removeLike(id);
      setLiked(false);
    } else {
      await courseService.addLike(id);
      setLiked(true);
    }
  };
  const HandleFavCourse = async () => {
    if (typeof id !== "string") return;

    if (favorited === true) {
      await courseService.removeFav(id);
      setFavorited(false);
    } else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>OneBitFlix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            background: "cover",
            backgroundPosition: "center",
            minHeight: "550px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0 ? true : false}
          >
            Assistir Agora
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img
                onClick={handleLikeCourse}
                className={styles.interactionsImages}
                src="/course/iconLike.svg"
                alt="likeImg"
              />
            ) : (
              <img
                onClick={handleLikeCourse}
                className={styles.interactionsImages}
                src="/course/iconLiked.svg"
                alt="LikedImg"
              />
            )}

            {favorited === false ? (
              <img
                onClick={HandleFavCourse}
                className={styles.interactionsImages}
                src="/course/iconaddFav.svg"
                alt="addFavImg"
              />
            ) : (
              <img
                onClick={HandleFavCourse}
                className={styles.interactionsImages}
                src="/course/iconFavorited.svg"
                alt="favoritedImg"
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>Episódios</p>
          <p className={styles.episodeLenght}>{course?.episodes?.length} episódios</p>
          {course?.episodes?.length === 0 ? (
            <strong>Não Temos episódios ainda, volte outra hora! &#x1f606;&#x1F918; </strong>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} course={course} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
}
