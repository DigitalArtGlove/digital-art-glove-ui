import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

const index_force = 6;
const coordRes = Math.pow(2,10);

export default function Home() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [select, setSelect] = React.useState(false);
  const [hover1, setHover1] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);
  
  const [xPos, setxPos] = React.useState(0);
  const [yPos, setyPos] = React.useState(0);

  const router = useRouter()
  
  // start websockets for cv and serial data
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

  // get cv data
  useEffect(() => {
    if (ws1) {
      ws1.onmessage = (evt) => {
        // console.log(evt.data);
        const d = evt.data.split(" ");
        setxPos(Number(d[0]/coordRes*window.innerWidth));
        setyPos(Number(d[1]/coordRes*window.innerHeight));
      };
    }
  }, [ws1]);

  // get select from force sensor
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

  // get element positioning
  useEffect(() => {
    let elem1 = document.getElementById("canvasLink");
    let rect1 = elem1.getBoundingClientRect();
    // console.log(rect1);
    let elem2 = document.getElementById("freeformLink");
    let rect2 = elem2.getBoundingClientRect();

    if (xPos > rect1.x && xPos < (rect1.x + rect1.width) && yPos > rect1.y && yPos < (rect1.y + rect1.height)) {
      setHover1(true);
    }

    if (xPos > rect2.x && xPos < (rect2.x + rect2.width) && yPos > rect2.y && yPos < (rect2.y + rect2.height)) {
      setHover2(true);
    }
  }, [xPos, yPos])

  //redirect to canvas or freeform
  useEffect(() => {
    if (hover1 && select) {
      router.push('/canvas');
    }
    if (hover2 && select) {
      router.push('/playroom');
    }
  },[hover1, hover2, select]);

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
            <div id="canvasLink" className={styles.card}>
              <h2>Art Mode &rarr;</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>

          <Link href="./playroom">
            <div id="freeformLink" className={styles.card}>
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