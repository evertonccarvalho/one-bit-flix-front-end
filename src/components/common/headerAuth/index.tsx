import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "@/src/services/profileService";

Modal.setAppElement("#__next");

export default function HeaderAuth() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchName, setSarchName] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`search?name=${searchName}`);
    setSarchName("");
  };

  const handleSearchClick = () => {
    router.push(`search?name=${searchName}`);
    setSarchName("");
  };

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      if (user) {
        const firstNameInitial = user.firstName ? user.firstName.slice(0, 1) : "";
        const lastNameInitial = user.lastName ? user.lastName.slice(0, 1) : "";
        setInitials(firstNameInitial + lastNameInitial);
      }
    });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handgleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home">
          <img src="/logoOnebitFLix.svg" alt="logoOnebItflix" className={styles.imgLogoNav} />
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={handleSearch}>
            <Input
              value={searchName}
              onChange={(event) => {
                setSarchName(event.currentTarget.value.toLowerCase());
              }}
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
            />
          </Form>
          <img
            onClick={handleSearchClick}
            src="/homeAuth/iconSearch.svg"
            alt="lupaHeader"
            className={styles.searchImg}
          />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile">
            <p className={styles.modalLink}>Meus dados</p>
          </Link>
          <p className={styles.modalLink} onClick={handgleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
    </>
  );
}
