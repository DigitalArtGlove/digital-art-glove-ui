import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const URL_WEB_SOCKET = 'ws://localhost:8765/';

const Sketch = dynamic( () => import('react-p5'), { ssr: false } );

const MySketch = () => {
  const [ws, setWs] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const [clear, setClear] = React.useState(false);
  const [pos, setPos] = React.useState([0,0]);
  const [prevPos, setPrevPos] = React.useState([0,0]);

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const height = window.innerHeight;
    const width = window.innerWidth;
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background('white');
    p5.strokeWeight(5);
    var button = p5.createButton('Clear');
    button.position(width/2, height - 75);
    button.mousePressed(() => {setClear(true); p5.clear(); setClear(false)});
  };

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

  const draw = (p5) => {
    if (update && !clear) {
      p5.line(pos[0], pos[1], prevPos[0] , prevPos[1]);
      setPrevPos(pos);
      setUpdate(false);
    }
  }

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt) => {
        //console.log(evt.data);
        const d = evt.data.split(" ");
        setUpdate(true);
        setPos([Number(d[10]/100*window.innerWidth), Number(d[11]/100*window.innerHeight)]);
      };
    }
  }, [ws]);

  return (
    <Sketch setup={setup} draw={draw} />
  );
};
export default MySketch;