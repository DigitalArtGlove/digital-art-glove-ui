import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Flower = dynamic( () => import('react-p5'), { ssr: false } );

let x_coord = 0;
let y_coord = 1;

const MyFlower = (data) => {

    const [pos, setPos] = React.useState([]);
    const [yaw, setYaw] = React.useState(0);
    const [pitch, setPitch] = React.useState(0);
    const [roll, setRoll] = React.useState(0);
    //const [flex, setFlex] = React.useState(0);
    //const [force, setForce] = React.useState(0);

    const [prevPos, setPrevPos] = React.useState(null);
  
    const [clear, setClear] = React.useState(false);
    const [save, setSave] = React.useState(false); 
    const [notStartUp, setNotStartUp] = React.useState(false);

    useEffect(() => {
        setPos(data.pos);
    },[data.pos]);

    useEffect(()=> {
        setClear(true);
    }, [data.clearToggle]);

    useEffect(()=> {
        if (notStartUp) {
            setSave(true);
        }
    }, [data.saveToggle]);

    const setup = (p5, canvasParentRef) => {
      // use parent to render the canvas in this ref
      // (without that p5 will render the canvas outside of your component)
      const height = window.innerHeight;
      const width = window.innerWidth;
  
      p5.createCanvas(width, height).parent(canvasParentRef);
      
      for (let a = 0; a < 300; a++) {
        for (let b = 0; b < 100; b++) {
          p5.stroke(a,b,400);
          p5.point(a,b);;
        }
      }
    };

    const draw = (p5) => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        p5.translate(width/2, height/2);

        p5.background(pos[y_coord]/2, 150, 400);
        p5.translate(width / 2, height / 2);
       
        var circleResolution = p5.map(pos[y_coord], 0, height, 2, 80);
        var radius = pos[x_coord] - width / 2 + 0.5;
        var angle = 2*Math.PI / circleResolution;
        
        p5.strokeWeight(pos[y_coord] / 20);
        
        p5.beginShape();
        for(var i = 0; i <= circleResolution; i++) {
          var x = Math.cos(angle * i) * radius;
          var y = Math.sin(angle * i) * radius;
          // p5.stroke(x, y, 800);
          p5.line(0, 0, x, y);
        }

        if (clear) {
            p5.clear();
            p5.background('white');
            setClear(false);
        }
        
        if (save && notStartUp) {
            p5.saveCanvas('myCanvas', 'jpg');
            setSave(false);
        }
    }

    return (
        <Flower setup={setup} draw={draw} />
      );
    };

export default MyFlower;