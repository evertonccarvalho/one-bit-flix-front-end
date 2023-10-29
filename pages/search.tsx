import styles from "@/styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/commom/headerAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import { Container } from "reactstrap";
import SearchCard from "@/src/components/searchCard";
import Footer from "@/src/components/commom/footer";
export default function Search() {
  const router = useRouter();
  const searchName: any = router.query.name;

  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async function () {
    const res = await courseService.getSearch(searchName);
    setSearchResult(res.data.courses);
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

  return (
    <>
      <Head>
        <title>OneBitFlix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.headFooterBg}>
          <HeaderAuth />
        </div>
        {searchResult.length >= 1 ? (
          <div className={styles.searchResult}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          </div>
        ) : (
          <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
        )}
        <div className={styles.headFooterBg}>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
