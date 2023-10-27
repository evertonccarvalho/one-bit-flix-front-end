import Head from "next/head";
import styles from "@/styles/profile.module.scss";
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/commom/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "@/src/components/commom/footer";

export default function UserInfo() {
  return (
    <>
      <Head>
        <title>OneBitFlix - Meus dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <Container className="py-5">
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button className={styles.renderForm}>Dados Pessoais</Button>
              <Button className={styles.renderForm}>Senha</Button>
            </Col>
            <Col md>
              <UserForm />
            </Col>
          </Row>
        </Container>
        <Footer />
      </main>
    </>
  );
}
