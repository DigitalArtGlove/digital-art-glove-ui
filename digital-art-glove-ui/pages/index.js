import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import React, { useEffect, useState } from 'react';

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

const index_force = 6;

export default function Home() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [select, setSelect] = React.useState(false);
  
  const [xPos, setxPos] = React.useState(0);
  const [yPos, setyPos] = React.useState(0);
  
  useEffect(() => {
    const wsClient1 = new WebSocket(URL_WEB_SOCKET1);
    wsClient1.onopen = () => {
      setWs1(wsClient1);
      console.log("ws open\n");
    };
    wsClient1.onclose = () => console.log("ws closed\n");
    return () => {
      wsClient1.close();
    };
  }, []);

  useEffect(() => {
    if (ws1) {
      ws1.onmessage = (evt) => {
        // console.log(evt.data);
        const d = evt.data.split(" ");
        setxPos(Number(d[0]/100*window.innerWidth));
        setyPos(Number(d[1]/100*window.innerHeight));
      };
    }
  }, [ws1]);

  useEffect(() => {
    const wsClient2 = new WebSocket(URL_WEB_SOCKET2);
    wsClient2.onopen = () => {
      setWs2(wsClient2);
      console.log("ws 2 open\n");
    };
    wsClient2.onclose = () => console.log("ws 2 closed\n");
    return () => {
      wsClient2.close();
    };
  }, []);

  useEffect(() => {
    if (ws2) {
      ws2.onmessage = (evt) => {
        // console.log(evt);
        const d = evt.data.split(" ");

        if (d[index_force] > 200) {
          setSelect(true);
        } else {
          setSelect(false);
        }
      };
    }
  }, [ws2]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} id="main">
        <h1 className={styles.title}>
          Welcome to Digital Art Glove
        </h1>

        <div className="box">
            <div className={styles.cursor}
              style = {{
                left: xPos+'px',
                top: yPos+'px'
              }}
            />
        </div>

        <p className={styles.description}>
          Get started by selecting a mode!
          {/* <code className={styles.code}>pages/index.js</code> */}
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