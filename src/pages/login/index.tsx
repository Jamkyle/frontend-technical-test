import { UserContext } from "src/context/UserContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Image from "next/image";
import Logo from "src/assets/lbc-logo.webp";
import styles from "src/styles/Home.module.css";

export default () => {
  const router = useRouter();
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push(`/conversations/${user.id}/`);
    }
  }, [user]);
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
        <div className={styles.login} onClick={login}>
          Connectez-vous ici!
        </div>
      </main>
    </div>
  );
};
