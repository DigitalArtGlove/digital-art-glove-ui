import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import Head from 'next/head'
import styles from '../styles/Canvas.module.css'
import Link from 'next/link'
import Play from './freeform/play'

import BackArrow from './backArrow';

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

// declaring sensors
const yaw = 0;
const pitch = 1;
const roll = 2;
const middle_flex = 3;
const ring_flex = 4;
const middle_force = 5;
const ring_force = 6;
const pinky_force = 7;

// declaring cv
const x_coord = 0;
const y_coord = 1;

const coordRes = Math.pow(2,10);

export default function Freeform() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [pos, setPos] = React.useState([0,0]);

  const [select, setSelect] = React.useState(false);

  const [hover1, setHover1] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);
  const [hover3, setHover3] = React.useState(false);
  const [hover4, setHover4] = React.useState(false);
  const [hover5, setHover5] = React.useState(false);

  const [back, setBack] = React.useState(false);

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
    let elem1 = document.getElementById("freeform1");
    let rect1 = elem1.getBoundingClientRect();
    let elem2 = document.getElementById("freeform2");
    let rect2 = elem2.getBoundingClientRect();
    let elem3 = document.getElementById("freeform3");
    let rect3 = elem3.getBoundingClientRect();
    let elem4 = document.getElementById("freeform4");
    let rect4 = elem4.getBoundingClientRect();
    let elem5 = document.getElementById("backButton");
    let rect5 = elem5.getBoundingClientRect();

    if (pos[x_coord] > rect1.x && pos[x_coord] < (rect1.x + rect1.width) && pos[y_coord] > rect1.y && pos[y_coord] < (rect1.y + rect1.height)) {
      setHover1(true);
      // console.log('1')
    }
    if (pos[x_coord] > rect2.x && pos[x_coord] < (rect2.x + rect2.width) && pos[y_coord] > rect2.y && pos[y_coord] < (rect2.y + rect2.height)) {
      setHover2(true);
      // console.log('2')
    }
    if (pos[x_coord] > rect3.x && pos[x_coord] < (rect3.x + rect3.width) && pos[y_coord] > rect3.y && pos[y_coord] < (rect3.y + rect3.height)) {
      setHover3(true);
      // console.log('3')
    }
    if (pos[x_coord] > rect4.x && pos[x_coord] < (rect4.x + rect4.width) && pos[y_coord] > rect4.y && pos[y_coord] < (rect4.y + rect4.height)) {
      setHover4(true);
      // console.log('4')
    }
    if (pos[x_coord] > rect5.x && pos[x_coord] < (rect5.x + rect5.width) && pos[y_coord] > rect5.y && pos[y_coord] < (rect5.y + rect5.height)) {
      setHover5(true);
      // console.log('back')
    }
  }, [pos[x_coord], pos[y_coord]])

  //redirect to canvas or freeform
  useEffect(() => {
    if (hover1 && select) {
      router.push('/freeform1');
    }
    if (hover2 && select) {
      router.push('/freeform2');
    }
    if (hover3 && select) {
      router.push('/freeform3');
    }
    if (hover4 && select) {
      router.push('/freeform4');
    }
    if (hover5 && select) {
      router.push('/');
    }
  },[hover1, hover2, hover3, hover4, hover5, select]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.sidebar}>
        <Link href="./">
          <div id="backButton" className={styles.backButton} onClick={() => setBack(true)}>
            <BackArrow />
          </div>
        </Link>
      </div>

      <div className={styles.main}>
        <div className="box">
            <div className={styles.cursor}
              style = {{
                left: (pos[0]-20)+'px',
                top: (pos[1]-20)+'px'
              }}
            />
        </div>
        <div className={styles.grid}>
          <Link href="./freeform/freeform1">
            <div id="freeform1" className={styles.card}>
              <h2>Kaleidescope</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>
          
          <Link href="./freeform/freeform2">
            <div id="freeform2" className={styles.card}>
              <h2>Flower Bloom</h2>
              <p>Make the flower bloom and change its size and colour!</p>
            </div>
          </Link>

          <Link href="./freeform/freeform3">
            <div id="freeform3" className={styles.card}>
              <h2>Repel</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>

          <Link href="./freeform/freeform4">
            <div id="freeform4" className={styles.card}>
              <h2>4</h2>
              <p>Create freeform art on a blank canvas</p>
            </div>
          </Link>

        </div>
      </div>

      <footer className={styles.footer}>
        Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
      </footer>
    </div>
  )
}
