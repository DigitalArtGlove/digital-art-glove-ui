import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'
import Cursor from './cursor'
import ColourBox from './colourBox';

const URL_WEB_SOCKET1 = 'ws://localhost:8765/';
const URL_WEB_SOCKET2 = 'ws://localhost:8766/';

const Sketch = dynamic( () => import('react-p5'), { ssr: false } );

// declaring sensors
const yaw = 0;
const pitch = 1;
const roll = 2;
const index_flex = 3;
const middle_flex = 4;
const ring_flex = 5;
const index_force = 6;
const middle_force = 7;
const ring_force = 8;
const pinky_force = 9;

// declaring cv
const x_coord = 0;
const y_coord = 1;

const MySketch = () => {
  const [ws1, setWs1] = React.useState(null);
  const [ws2, setWs2] = React.useState(null);

  const [update, setUpdate] = React.useState(false);
  const [clear, setClear] = React.useState(false);

  const [xPos, setxPos] = React.useState(0);
  const [yPos, setyPos] = React.useState(0);

  const [pos, setPos] = React.useState(null);
  const [prevPos, setPrevPos] = React.useState(null);

  const [select, setSelect] = React.useState(false);
  const [erase, setErase] = React.useState(false);
  const [changeColour, setChangeColour] = React.useState(false);
  const [colourIndex, setColourIndex] = React.useState(0);

  const colourValues = {0:"0 0 0", 1:"135 40 237", 2:"25 175 250", 3:"222 22 212" };
  let prevPinky = 0;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    const height = window.innerHeight;
    const width = window.innerWidth;
    p5.createCanvas(width, height).parent(canvasParentRef);
    // p5.background('white');
    p5.stroke(0);
    p5.strokeWeight(5);
    var button = p5.createButton('Clear');
    button.position(width/2, height - 75);
    button.mousePressed(() => {setClear(true); p5.clear(); setClear(false)});
  };

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
        setUpdate(true);
        setPos([Number(d[x_coord]/100*window.innerWidth), Number(d[y_coord]/100*window.innerHeight)]);
        setxPos(Number(d[0]/100*window.innerWidth));
        setyPos(Number(d[1]/100*window.innerHeight));
      };
    }
  }, [ws1]);

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

        if (d[ring_force] > 200) {
          setErase(true);
        } else {
          setErase(false);
        }

        if (d[pinky_force] > 200 && prevPinky < 200) {
          setChangeColour(true);
          prevPinky = d[pinky_force];
          // console.log(prevPinky);
        } else {
          setChangeColour(false);
          prevPinky = d[pinky_force];
        }

      };
    }
  }, [ws2]);

  const draw = (p5) => {
    // background_colour 
    // p5.background(background_colour);
    if (update && changeColour) {
      setColourIndex((colourIndex + 1) % Object.keys(colourValues).length);
      let colourSet = colourValues[colourIndex].split(" ");
      let rVal = Number(colourSet[0]);
      let gVal = Number(colourSet[1]);
      let bVal = Number(colourSet[2]);
      p5.stroke(rVal, gVal, bVal);
      // console.log(colourValues[colourIndex];
      // console.log(colour_choice);
    }
    if (update && select && !erase && !clear && prevPos != null) {
      p5.line(pos[x_coord], pos[y_coord], prevPos[x_coord] , prevPos[y_coord]);
      // background_colour = 255;
      setPrevPos(pos);
      setUpdate(false);
    } else if (update && erase && !select && !clear) {
      // background_colour = 235;
      p5.erase();
      p5.fill(255,0,0);
      p5.circle(pos[x_coord], pos[y_coord], 30);
      p5.noErase();
      setPrevPos(pos);
      setUpdate(false);
    } else if (update && !select && !erase) {
      // p5.background('white');
      // p5.circle(pos[0], pos[1], 30);
      setPrevPos(pos);
      setUpdate(false);
    }
  }

  return (
    <>
      <Sketch setup={setup} draw={draw} />
      <div className="box">
          <div className={styles.cursor}
            style = {{
              left: (xPos-20)+'px',
              top: (yPos-20)+'px'
            }}
          />
      </div>
      <div className={styles.currentColourBox}>
          <div>The current brush colour is</div>
          <ColourBox colourValue={colourIndex} />
      </div>
    </>
  );
};
export default MySketch;