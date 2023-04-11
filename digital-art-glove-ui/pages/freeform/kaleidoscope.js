import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Kaleidoscope = dynamic( () => import('react-p5'), { ssr: false } );

let x_coord = 0;
let y_coord = 1;

const MyKaleidoscope = (data) => {

    const [pos, setPos] = React.useState([]);

    const [prevPos, setPrevPos] = React.useState([]);
  
    const [clear, setClear] = React.useState(false);
    const [save, setSave] = React.useState(false); 
    const [notStartUp, setNotStartUp] = React.useState(false);

    let lineofsym = 6;
    let angle = 360/lineofsym;
    let minbrush = 2;
    let maxbrush = 8;
    let brush = 5;
    let colours = [28,74,120,158,201,220,255];
    let i = 0;

    let mx = 0;
    let my = 0;
    let pmx = 0;
    let pmy = 0;

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
      p5.background(255);
      p5.colorMode(p5.HSB);
    };

    const draw = (p5) => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        
        p5.translate(width/2, height/2);

        setPrevPos(pos);

        if (pos[x_coord]>0 && pos[x_coord]<width && pos[y_coord]>0 && pos[y_coord]<height) {
            mx = pos[x_coord] - width/2;
            my = pos[y_coord] - height/2;
            pmx = prevPos[x_coord] - width/2;
            pmy = prevPos[y_coord] - height/2

            if (data.ring && brush < maxbrush) {
                brush += 1;
            }
            if (data.pinky && brush > minbrush) {
                brush -= 1;
            }
        }

        if (data.select) {
            for (let i=0; i < lineofsym; i++) {
                p5.rotate(angle);
                p5.strokeWeight(brush);
                p5.stroke(pos[x_coord]-20, 120, pos[y_coord]-20);
                p5.line(mx, my, pmx, pmy);
                p5.push();
                p5.scale(1,-1);
                p5.line(mx, my, pmx, pmy);
                p5.pop();
            }
            setNotStartUp(true);
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
        <Kaleidoscope setup={setup} draw={draw} />
      );
    };

export default MyKaleidoscope;