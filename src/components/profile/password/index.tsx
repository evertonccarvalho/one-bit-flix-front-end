import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "@/styles/profile.module.scss";

export default function PasswordForm() {
  return (
    <Form className={styles.form}>
      <div className={styles.inputNormalDiv}>
        <FormGroup>
          <Label className={styles.label} for="currentPassword">
            Senha Atual
          </Label>
          <Input
            name="currentPassword"
            type="password"
            id="currentPassword"
            placeholder="***********"
            required
            minLength={6}
            maxLength={12}
            className={styles.input}
          />
        </FormGroup>
      </div>
      <div className={styles.inputFlexDiv}>
        <FormGroup>
          <Label for="newPassword" className={styles.label}>
            Nova Senha
          </Label>
          <Input
            name="newPassword"
            type="password"
            id="newPassword"
            placeholder="***********"
            required
            minLength={6}
            maxLength={12}
            className={styles.input}
          />
        </FormGroup>{" "}
        <FormGroup>
          <Label for="ConfirmNewPassword" className={styles.label}>
            Confirme a Nova Senha
          </Label>
          <Input
            name="ConfirmNewPassword"
            type="password"
            id="ConfirmNewPassword"
            placeholder="***********"
            required
            minLength={6}
            maxLength={12}
            className={styles.input}
          />
        </FormGroup>
      </div>
      <Button type="submit" outline className={styles.formBtn}>
        Salvar Altreações
      </Button>
    </Form>
  );
}
