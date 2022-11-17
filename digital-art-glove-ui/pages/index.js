import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Digital Art Glove
        </h1>

        <p className={styles.description}>
          Get started by selecting a mode
        </p>

        <div className={styles.grid}>
          <Link href="./canvas">
            <div className={styles.card}>
              <h2>Art Mode &rarr;</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>

          <a href="" className={styles.card}>
            <h2>Training Mode &rarr;</h2>
            <p>This feature is not yet available, please hold tight!</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
      </footer>
    </div>
  )
}
