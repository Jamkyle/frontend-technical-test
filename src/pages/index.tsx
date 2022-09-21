import { FC, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/lbc-logo.webp";
import styles from "../styles/Home.module.css";
import { UserContext } from "src/context/UserContext";

const Home: FC = () => {
  const year = new Date().getFullYear();
  const { user } = useContext(UserContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        ></meta>
      </Head>

      <main className={styles.main}>
        <Image
          src={Logo}
          alt="Leboncoin Frontend Team"
          width={400}
          height={125}
          layout="fixed"
        />
        <h1 className={styles.title}>Welcome !</h1>
        <p>You want to chat with someone</p>
        <Link href={`/conversations/${user?.id}`}>chat here!</Link>
      </main>

      <footer className={styles.footer}>&copy; leboncoin - {year}</footer>
    </div>
  );
};

export default Home;
