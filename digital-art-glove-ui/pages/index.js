import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

const middle_force = 5;
const x_coord = 0;
const y_coord = 1;
const coordRes = Math.pow(2,10);

export default function Home() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [pos, setPos] = React.useState([0,0]);

  const [select, setSelect] = React.useState(false);

  const [hover1, setHover1] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);

  const router = useRouter()
  
  // start websockets for cv and serial data
  useEffect(() => {
    const wsClient1 = new WebSocket(URL_WEB_SOCKET1);
    wsClient1.onopen = () => {
      setWs1(wsClient1);
      console.log("ws 1 open\n");
    };
    wsClient1.onclose = () => console.log("ws 1 closed\n");
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

  useEffect(() => {
    if (ws1) {
      ws1.onmessage = (evt) => {
        const cvData = evt.data.split(" ");
        setPos(
          [Number(cvData[x_coord]/coordRes*window.innerWidth),
          Number(cvData[y_coord]/coordRes*window.innerHeight)]
        );
      };
    }
  }, [ws1]);

  useEffect(() => {
    if (ws2) {
      ws2.onmessage = (evt) => {
        const serialData = evt.data.split(" ");
        if (serialData[middle_force] > 125) {
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
    let elem2 = document.getElementById("freeformLink");
    let rect2 = elem2.getBoundingClientRect();

    if (pos[x_coord] > rect1.x && pos[x_coord] < (rect1.x + rect1.width) && pos[y_coord] > rect1.y && pos[y_coord] < (rect1.y + rect1.height)) {
      setHover1(true);
    } else {
      setHover1(false);
    }

    if (pos[x_coord] > rect2.x && pos[x_coord] < (rect2.x + rect2.width) && pos[y_coord] > rect2.y && pos[y_coord] < (rect2.y + rect2.height)) {
      setHover2(true);
    } else {
      setHover2(false);
    }
  }, [pos[x_coord], pos[y_coord]]);

  //redirect to canvas or freeform
  useEffect(() => {
    if (hover1 && select) {
      router.push('/canvas');
    }
    if (hover2 && select) {
      router.push('/freeform');
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
                left: (pos[0]-20)+'px',
                top: (pos[1]-20)+'px'
              }}
            />
        </div>

        <p className={styles.description}>
          Get started by selecting a mode!
          {/* <code className={styles.code}>pages/index.js</code> */}
        </p>
        <div className={styles.grid}>
          <Link href="./canvas">
            <div id="canvasLink" className={styles.card}
              style = {{
                color: hover1 ? 'rgb(135,40,237)' : 'black',
                borderColor: hover1 ? 'rgb(135,40,237)' : '#eaeaea'
              }}
            >
              <h2>Art Mode &rarr;</h2>
              <p>Paint a beautiful picture on a blank canvas!</p>
            </div>
          </Link>

          <Link href="./freeform">
            <div id="freeformLink" className={styles.card}
              style = {{
                color: hover2 ? 'rgb(135,40,237)' : 'black',
                borderColor: hover2 ? 'rgb(135,40,237)' : '#eaeaea'
              }}
            >
              <h2>Freeform Mode &rarr;</h2>
              <p>Create some abstract art by moving objects around!</p>
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