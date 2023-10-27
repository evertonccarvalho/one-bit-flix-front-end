import styles from "@/styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function UserForm() {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>NT</p>
          <p className={styles.userName}>Name Test</p>
        </div>
        <div className={styles.memberTime}>
          <img
            className={styles.memberTimeImg}
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            20 de Abril de 2020
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label for="firstName" className={styles.label}>
              Nome:
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"Name"}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="lastName" className={styles.label}>
              Sobrenome:
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o seu sobrenome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"sobrenome"}
            ></Input>
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label for="phone" className={styles.label}>
              Whatssapp / Telegram
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={"+55 (21) 9 9999-9999"}
            ></Input>
          </FormGroup>{" "}
          <FormGroup>
            <Label for="email" className={styles.label}>
              Whatssapp / Telegram
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={"testeemail@gmail.com"}
            ></Input>
          </FormGroup>
          <Button className={styles.formBtn} outline type="submit">
            Salvar Alterações
          </Button>
        </div>
      </Form>
    </>
  );
}
