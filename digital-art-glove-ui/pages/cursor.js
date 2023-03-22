import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const URL_WEB_SOCKET = 'ws://localhost:8765/';

const MyCursor = () => { 
  const [ws, setWs] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const [xPos, setxPos] = React.useState(0);
  const [yPos, setyPos] = React.useState(0);
  
  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      console.log("ws open\n");
    };
    wsClient.onclose = () => console.log("ws closed\n");
    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt) => {
        // console.log(evt.data);
        const d = evt.data.split(" ");
        setUpdate(true);
        setxPos(Number(d[0]/100*window.innerWidth));
        setyPos(Number(d[1]/100*window.innerHeight));
      };
    }
  }, [ws]);

  return (
    xPos, yPos
  );
};
export default MyCursor;