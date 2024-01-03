// import "@splidejs/react/dist/css/splide.min.css";
import { Container } from "reactstrap";
import styles from "./styles.module.scss";
import { CourseType } from "@/src/services/courseService";

export default function Footer() {
  return (
    <>
      <Container className={styles.footer}>
        <img
          src="/logoOneBitcode.svg"
          alt="logoFooter"
          className={styles.footerLogo}
        />
        <a
          href="http://onebitcode.com"
          target={"_blank"}
          className={styles.footerLink}
        >
          OneBitCode.com
        </a>
      </Container>
    </>
  );
}
