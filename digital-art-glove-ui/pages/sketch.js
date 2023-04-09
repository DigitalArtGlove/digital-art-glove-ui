import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic( () => import('react-p5'), { ssr: false } );

// declaring cv
const x_coord = 0;
const y_coord = 1;

const MySketch = (data) => {

  // console.log(data.clear);

  const [prevPos, setPrevPos] = React.useState(null);
  const [prevPrevPos, setPrevPrevPos] = React.useState(null);
  
  const [clear, setClear] = React.useState(false);
  const [save, setSave] = React.useState(false); 
  const [notStartUp, setNotStartUp] = React.useState(false);

  const colourValues = {0:"0 0 0", 1:"135 40 237", 2:"25 175 250", 3:"222 22 212" };

  let size = Math.min(Math.max(data.pos[0]-300, 5), 65);

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
    const height = (window.innerHeight)*0.92;
    const width = window.innerWidth;
    let c = p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background('white');
  };

  const draw = (p5) => {
    let colourSet = colourValues[data.colourIndex].split(" ");
    let rVal = Number(colourSet[0]);
    let gVal = Number(colourSet[1]);
    let bVal = Number(colourSet[2]);
    p5.stroke(rVal, gVal, bVal);
    p5.strokeWeight(size);

    if (data.update && data.select && !data.erase && prevPrevPos != null) {
      
      p5.noFill();
      p5.beginShape();
      p5.curveVertex(prevPrevPos[x_coord], prevPrevPos[y_coord]);
      p5.curveVertex(prevPrevPos[x_coord], prevPrevPos[y_coord]);
      p5.curveVertex(prevPos[x_coord], prevPos[y_coord]);
      p5.curveVertex(data.pos[x_coord], data.pos[y_coord]);      
      p5.curveVertex(data.pos[x_coord], data.pos[y_coord]);      
      p5.endShape();
      
      setPrevPos(data.pos);
      setPrevPrevPos(prevPos);
      setNotStartUp(true);

    } else if (data.update && data.erase && !data.select && prevPrevPos != null) {
      p5.erase();
      p5.fill(255,0,0);
      p5.circle(data.pos[x_coord], data.pos[y_coord], 30);
      //p5.line(pos[x_coord], pos[y_coord], prevPos[x_coord], prevPos[y_coord]);

      p5.noErase();
      setPrevPos(data.pos);
      setPrevPrevPos(prevPos);

    } else if (data.update && !data.select && !data.erase) {
      // p5.background('white');
      // p5.circle(pos[0], pos[1], 30);
      setPrevPos(data.pos);
      setPrevPrevPos(prevPos);
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
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  );
};
export default MySketch;