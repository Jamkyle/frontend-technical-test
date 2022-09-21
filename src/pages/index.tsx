import { FC, useContext } from "react";
import { UserContext } from "src/context/UserContext";

const Home: FC = () => {
  const year = new Date().getFullYear()
  const { user } = useContext(UserContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>

      <main className={styles.main}>
        <Link href={`/conversations/${user?.id}`}>chat here!</Link>

        <p className={styles.description}>
          This test is based on a <a title="Next.js documentation" href="https://nextjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">Next.js</a> application.<br />
          Fork the repository and use the <code className={styles.code}>main</code> branch as your starting point.
          <br /><br />

          Get started by reading{' '}
          <code className={styles.code}>README.md</code> and editing <code className={styles.code}>src/pages/index.js</code>
          <br />
          Once you are done, send the repository link to your HR contact.
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>Design</h2>
            <p>Feel free to create any design you want for this exercise. Let your creativity talks !</p>
          </article>

          <article className={styles.card}>
            <h2>Libraries</h2>
            <p>Feel free to use any library you want. Only Next.js / React are required.</p>
          </article>

          <article className={styles.card}>
            <h2>API Server</h2>
            <p>
              Start the API server on port <code className={styles.code}>3005</code> by running<br /><code className={styles.code}>npm run start-server</code>.<br/>
              Find the swagger definitions in <code className={styles.code}>docs/api-swagger.yml</code> or <a title="API Swagger documentation" href="https://leboncoin.tech/frontend-technical-test/" target="_blank" rel="noopener noreferrer">the online documentation</a>.
            </p>
          </article>

          <article className={styles.card}>
            <h2>Timing</h2>
            <p>We recommend 4 hours for this test. You are free to spend more (or less) time, let us know how much time did you spend.</p>
          </article>
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}

export default Home