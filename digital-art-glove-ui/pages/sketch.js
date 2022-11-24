import React from 'react';
import dynamic from 'next/dynamic';
const Sketch = dynamic( () => import('react-p5'), { ssr: false } );

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
  button.mousePressed(() => {p5.clear()});
};

const draw = (p5) => {
  // // NOTE: Do not use setState in the draw function or in functions that are executed
  // // in the draw function...
  // // please use normal variables or class properties for these purposes

  if (p5.mouseIsPressed) { 
    p5.line(p5.mouseX, p5.mouseY, p5.pmouseX , p5.pmouseY);
  }
};

export default function MySketch (props) {

	return <Sketch setup={setup} draw={draw} />;

};