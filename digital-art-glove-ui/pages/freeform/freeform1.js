import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

import Head from 'next/head';
import styles from '../../styles/Canvas.module.css';
import Kaleidoscope from './kaleidoscope';
import BackArrow from '../backArrow';
import SaveIcon from '../saveIcon';
import ClearIcon from '../clearIcon';

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

// Same as coordRes used in CV file that determines the resolution (number of digits) we send to front-end
const coordRes = Math.pow(2,10);

export default function Canvas() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [update, setUpdate] = React.useState(false);

  const [pos, setPos] = React.useState([0,0]);

  const [select, setSelect] = React.useState(false);
  const [ringPress, setRingPress] = React.useState(false);
  const [pinkyPress, setPinkyPress] = React.useState(false);

  const [hover1, setHover1] = React.useState(false);
  const [hover2, setHover2] = React.useState(false);
  const [hover3, setHover3] = React.useState(false);

  const [clearToggle, setClearToggle] = React.useState(false);
  const [saveToggle, setSaveToggle] = React.useState(false);

  const router = useRouter()

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
        setUpdate(true);
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
        setUpdate(true);
        if (serialData[middle_force] > 125) {
          setSelect(true);
        } else {
          setSelect(false);
        }
        if (serialData[ring_force] > 125) {
          setRingPress(true);
        } else {
          setRingPress(false);
        }
        // replace with pinky force sensor
        if (serialData[pinky_force] > 125) {
          setPinkyPress(true);
        } else {
          setPinkyPress(false);
        }
      };
    }
  }, [ws2]);

  useEffect(() => {

    let elem1 = document.getElementById("backButton");
    let rect1 = elem1.getBoundingClientRect();
    let elem2 = document.getElementById("clearButton");
    let rect2 = elem2.getBoundingClientRect();
    let elem3 = document.getElementById("saveButton");
    let rect3 = elem3.getBoundingClientRect();

    if (pos[x_coord] > rect1.x && pos[x_coord] < (rect1.x + rect1.width) && pos[y_coord] > rect1.y && pos[y_coord] < (rect1.y + rect1.height)) {
      setHover1(true);
      // console.log('back')
    } else {
      setHover1(false);
    }
    if (pos[x_coord] > rect2.x && pos[x_coord] < (rect2.x + rect2.width) && pos[y_coord] > rect2.y && pos[y_coord] < (rect2.y + rect2.height)) {
      setHover2(true);
      // console.log('clear')
    } else {
      setHover2(false);
    }
    if (pos[x_coord] > rect3.x && pos[x_coord] < (rect3.x + rect3.width) && pos[y_coord] > rect3.y && pos[y_coord] < (rect3.y + rect3.height)) {
      setHover3(true);
      // console.log('save')
    } else {
      setHover3(false);
    }
  }, [pos[x_coord], pos[y_coord]])

  //redirect to index, clear, save
  useEffect(() => {
    if (hover1 && select) {
      router.push('/');
    }
    if (hover2 && select) {
      setClearToggle(!clearToggle);
    }
    if (hover3 && select) {
      setSaveToggle(!saveToggle);
    }
  },[hover1, hover2, hover3, select]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Digital Art Glove</title>
                <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="box">
                <div className={styles.cursor}
                style = {{
                    left: (pos[0]-20)+'px',
                    top: (pos[1]-20)+'px'
                }}
                />
            </div>
        
            <div className={styles.sidebar}>
                <Link href="./">
                    <div id="backButton" className={styles.backButton}>
                    <BackArrow />
                    </div>
                </Link>
                <div id="clearButton" className={styles.clearButton} onClick={() => setClearToggle(!clearToggle)}>
                    <ClearIcon />
                </div>
                <div id="saveButton" className={styles.saveButton} onClick={() => setSaveToggle(!saveToggle)}>
                    <SaveIcon />
                </div>
            </div>
           
            <div className={styles.main}>
                <Kaleidoscope 
                  pos={pos} 
                  ring={ringPress} 
                  pinky={pinkyPress} 
                  clearToggle={clearToggle}
                  saveToggle={saveToggle}
                />
            </div>
            <footer className={styles.footer}>
            Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
            </footer>
        </div>
    )
}