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

  const [ringPress, setRingPress] = React.useState(false);
  const [pinkyPress, setPinkyPress] = React.useState(false);

  const [hover1, setHover1] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);
  const [hover3, setHover3] = React.useState(false);
  const [hover4, setHover4] = React.useState(false);
  const [hover5, setHover5] = React.useState(false);

  const [back, setBack] = React.useState(false);

  const router = useRouter();

  const [check, setCheck] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  
  let myInterval;

  if (!check) {
    myInterval = setInterval(()=>{
      setCheck(true);
    }, 2250);
  }

  useEffect(() => {
    if (check) {
      clearInterval(myInterval);
      if(!ready) {
        location.reload();
      }
    }
  },[check]);
  

  // start websockets for cv and serial data
  useEffect(() => {
    const wsClient1 = new WebSocket(URL_WEB_SOCKET1);
    wsClient1.onopen = () => {
      setWs1(wsClient1);
      setReady(true);
      console.log("ws 1 open\n");
    };
    wsClient1.onclose = () => console.log("ws 1 closed\n");
    return () => {
      setReady(false);
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
    if(ready) {
      let elem1 = document.getElementById("freeform1");
      let rect1 = elem1.getBoundingClientRect();
      let elem2 = document.getElementById("freeform2");
      let rect2 = elem2.getBoundingClientRect();
      let elem3 = document.getElementById("freeform3");
      let rect3 = elem3.getBoundingClientRect();
      // let elem4 = document.getElementById("freeform4");
      // let rect4 = elem4.getBoundingClientRect();
      let elem5 = document.getElementById("backButton");
      let rect5 = elem5.getBoundingClientRect();

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
      if (pos[x_coord] > rect3.x && pos[x_coord] < (rect3.x + rect3.width) && pos[y_coord] > rect3.y && pos[y_coord] < (rect3.y + rect3.height)) {
        setHover3(true);
      } else {
        setHover3(false);
      }
      // if (pos[x_coord] > rect4.x && pos[x_coord] < (rect4.x + rect4.width) && pos[y_coord] > rect4.y && pos[y_coord] < (rect4.y + rect4.height)) {
      //   setHover4(true);
      // } else {
      //   setHover4(false);
      // }
      if (pos[x_coord] > rect5.x && pos[x_coord] < (rect5.x + rect5.width) && pos[y_coord] > rect5.y && pos[y_coord] < (rect5.y + rect5.height)) {
        setHover5(true);
      } else {
        setHover5(false);
      }
    }
  }, [ready, pos[x_coord], pos[y_coord]])

  //redirect to canvas or freeform
  useEffect(() => {
    if (hover1 && select) {
      router.push('/freeform/freeform1');
    }
    if (hover2 && select) {
      router.push('/freeform/freeform2');
    }
    if (hover3 && select) {
      router.push('/freeform/freeform3');
    }
    // if (hover4 && select) {
    //   router.push('/freeform/freeform4');
    // }
    if (hover5 && select) {
      router.push('/');
    }
  },[hover1, hover2, hover3, hover5, select]);

  if (ready) {
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
              <BackArrow colour={hover5 ? 'rgb(135,40,237)' : 'black'}/>
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
              <div id="freeform1" className={styles.card}
                style = {{
                  color: hover1 ? 'rgb(135,40,237)' : 'black',
                  borderColor: hover1 ? 'rgb(135,40,237)' : '#eaeaea'
                }}
              >
                <h2>Kaleidoscope</h2>
                <p>Create and manipulate a kaleidoscope!</p>
              </div>
            </Link>
            
            <Link href="./freeform/freeform2">
              <div id="freeform2" className={styles.card}
                style = {{
                  color: hover2 ? 'rgb(135,40,237)' : 'black',
                  borderColor: hover2 ? 'rgb(135,40,237)' : '#eaeaea'
                }}
              >
                <h2>Flower Bloom</h2>
                <p>Make the flower bloom and change its size and colour!</p>
              </div>
            </Link>

            <Link href="./freeform/freeform3">
              <div id="freeform3" className={styles.card}
                style = {{
                  color: hover3 ? 'rgb(135,40,237)' : 'black',
                  borderColor: hover3 ? 'rgb(135,40,237)' : '#eaeaea'
                }}
              >
                <h2>Line Drawing</h2>
                <p>Create freeform art on a blank canvas</p>
              </div>
            </Link>

            {/* <Link href="./freeform/freeform4">
              <div id="freeform4" className={styles.card}
                style = {{
                  color: hover4 ? 'rgb(135,40,237)' : 'black',
                  borderColor: hover4 ? 'rgb(135,40,237)' : '#eaeaea'
                }}
              >
                <h2>4</h2>
                <p>Create freeform art on a blank canvas</p>
              </div>
            </Link> */}

          </div>
        </div>

        <footer className={styles.footer}>
          Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
        </footer>
      </div>
    )
  } else {
    return(
      <div className={styles.container}>
        <Head>
            <title>Digital Art Glove</title>
            <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main} id="main">
            
            <div className={styles.instruction}>
                <h1 className={styles.title}>
                    Loading...
                </h1>
            </div>
        </main>
      </div>
    )
  } 
}
