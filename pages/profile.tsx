import Head from "next/head";
import styles from "@/styles/profile.module.scss";
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/commom/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "@/src/components/commom/footer";
import { useState } from "react";
import PasswordForm from "@/src/components/profile/password";
export default function UserInfo() {
  const [form, setForm] = useState("");
  return (
    <>
      <Head>
        <title>OneBitFlix - Meus dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderAuth />
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                style={{ color: form === "userForm" ? "#ff0044" : "white" }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                Dados Pessoais
              </Button>
              <Button
                style={{ color: form === "passwordForm" ? "#ff0044" : "white" }}
                className={styles.renderForm}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                Senha
              </Button>
            </Col>
            <Col md>{form === "userForm" ? <UserForm /> : <PasswordForm />}</Col>
          </Row>
        </Container>
        <Footer />
      </main>
    </>
  );
}
