import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Angle = dynamic( () => import('react-p5'), { ssr: false } );

let x_coord = 0;
let y_coord = 1;

const MyAngle = (data) => {

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

    let lineThickness = 5;
    let lineLength = 150;

    let angle = 0;
    let angleRot = 0.5;

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
      p5.angleMode(p5.DEGREES);
    }; 

    const draw = (p5) => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        if (!data.select) {
            p5.translate(pos[x_coord], pos[y_coord]);
            // p5.rotate(angle);
            p5.strokeWeight(lineThickness);
            p5.stroke(pos[x_coord], 135, pos[y_coord]);
            p5.line(0,0,lineLength,0);
        }

        if (data.pitch) {
            angle = data.pitch;
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
        <Angle setup={setup} draw={draw} />
      );
    };

export default MyAngle;