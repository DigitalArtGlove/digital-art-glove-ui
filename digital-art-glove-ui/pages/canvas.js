import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import styles from '../styles/Canvas.module.css'
import Sketch from './sketch'

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

export default function Canvas() {

  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [cvData, setCVData] = React.useState([]);
  const [serialData, setSerialData] = React.useState([]);

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
        // console.log(evt);
        const d = evt.data.split(" ");
        setCVData(d);
      };
    }
  }, [ws1]);

  useEffect(() => {
    if (ws2) {
      ws2.onmessage = (evt) => {
        // console.log(evt);
        const d = evt.data.split(" ");
        setSerialData(d);
      };
    }
  }, [ws2]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Art Glove</title>
        <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.canvas}> 
        <div className={styles.main}>
          <Sketch cv_data={cvData} serial_data={serialData}/>
        </div>
      </div>

      <footer className={styles.footer}>
        Created by Beatrice Tam, Kaylee Jung, Mika Nogami, and Josiann Zhou
      </footer>
    </div>
  )
}
