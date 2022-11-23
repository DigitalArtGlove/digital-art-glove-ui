import Head from 'next/head'
import styles from '../styles/Canvas.module.css'
import Sketch from './sketch'

export default function Canvas() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.main}>
          <Sketch />
        </div>

      <footer className={styles.footer}>
        Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
      </footer>
    </div>
  )
}
