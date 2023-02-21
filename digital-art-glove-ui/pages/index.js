import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Digital Art Glove
        </h1>

        <p className={styles.description}>
          Get started by selecting a mode
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          <Link href="./canvas">
            <div className={styles.card}>
              <h2>Art Mode &rarr;</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>

          <Link href="./playroom">
            <div className={styles.card}>
              <h2>Freeform Mode &rarr;</h2>
              <p>This feature is still in development... Check back soon!</p>
            </div>
          </Link>

        </div>

      </main>

      <footer className={styles.footer}>
        Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
      </footer>

    </div>
  )
}