import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/commom/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/src/components/commom/footer";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import ToastComponent from "@/src/components/commom/toast";
import authService from "@/src/services/authService";

export default function Login() {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const registerSucess = router.query.registred;
    if (registerSucess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Email ou senha incorretas!");
    }
  };

  return (
    <>
      <Head>
        <title>OneBitFlix - Login</title>

        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.name}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) de Volta!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem-vindo(a) OneBitFlix!</strong>
            </p>
            <FormGroup>
              <Label for="password" className={styles.label}>
                E-mail
              </Label>
              <Input
                className={styles.input}
                for="email"
                name="email"
                type="email"
                placeholder="Qual o seu email?"
                required
              ></Input>
            </FormGroup>{" "}
            <FormGroup>
              <Label for="password" className={styles.label}>
                E-mail
              </Label>
              <Input
                className={styles.input}
                for="password"
                name="password"
                type="password"
                placeholder="Qual a sua senha?"
                required
              ></Input>
              <Button type="submit" outline className={styles.formBtn}>
                Entrar
              </Button>
            </FormGroup>
          </Form>
          <Footer />
          <ToastComponent
            color={toastColor}
            isOpen={toastIsOpen}
            message={toastMessage}
          />
        </Container>
      </main>
    </>
  );
}