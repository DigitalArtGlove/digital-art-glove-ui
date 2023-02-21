import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const URL_WEB_SOCKET = 'ws://localhost:8765/';

const Play = dynamic( () => import('react-p5'), { ssr: false } );

const MyPlay = () => {
    const [ws, setWs] = React.useState(null);
    const [update, setUpdate] = React.useState(false);
    const [clear, setClear] = React.useState(false);
    const [yaw, setYaw] = React.useState(0);
    const [pitch, setPitch] = React.useState(0);
    const [roll, setRoll] = React.useState(0);
    const [xPos, setXPos] = React.useState(0);
    const [yPos, setYPos] = React.useState(0);
    //const [flex, setFlex] = React.useState(0);
    //const [force, setForce] = React.useState(0);

    
  
    const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      const height = window.innerHeight;
      const width = window.innerWidth;

      p5.createCanvas(width, height).parent(canvasParentRef);
      //p5.colorMode(HSB, 400);
      for (let a = 0; a < 300; a++) {
        for (let b = 0; b < 100; b++) {
          p5.stroke(a,b,400);
          p5.point(a,b);;
        }
      }
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

      const height = window.innerHeight;
      const width = window.innerWidth;

      if (update && !clear) {
        //p5.square(yaw, pitch, 100);
        setUpdate(false);

        p5.background(yPos/2, 150, 400);
        p5.translate(width / 2, height / 2);
       
        var circleResolution = p5.map(yPos, 0, height, 2, 80);
        var radius = xPos - width / 2 + 0.5;
        var angle = 2*Math.PI / circleResolution;
        
        p5.strokeWeight(yPos / 20);
        
        p5.beginShape();
        for(var i = 0; i <= circleResolution; i++) {
          var x = Math.cos(angle * i) * radius;
          var y = Math.sin(angle * i) * radius;
          // p5.stroke(x, y, 800);
          p5.line(0, 0, x, y);
        }
        //p5.endShape(CLOSE);
      }
    }
  
    useEffect(() => {
      if (ws) {
        ws.onmessage = (evt) => {
          //console.log(evt);
          const d = evt.data.split(" ");
          setUpdate(true);
          //setYaw(Number(Math.abs(d[0])*5));
          //setPitch(Number(Math.abs(d[1])*5));
          //setRoll(Number(Math.abs([2])*5));

          // setFlex(Math.floor(d[3]-1000)*2);
          // setForce(Math.floor(d[6]*10));

          setXPos(Math.floor(d[10]/100*window.innerWidth));
          setYPos(Math.floor(d[11]/100*window.innerWidth));

          //console.log(xPos, yPos)

        };
      }
    }, [ws]);
  
    return (
      <Play setup={setup} draw={draw} />
    );
  };
  export default MyPlay;