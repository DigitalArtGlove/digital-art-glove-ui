import React from 'react';
import dynamic from 'next/dynamic';
import { WebSocketNext } from 'nextjs-websocket'

const Sketch = dynamic( () => import('react-p5'), { ssr: false } );

export default function MySketch (props) {
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
  
  const draw = (p5) => {
    // // NOTE: Do not use setState in the draw function or in functions that are executed
    // // in the draw function...
    // // please use normal variables or class properties for these purposes
  
    // if (p5.mouseIsPressed) { 
    //   p5.line(p5.mouseX, p5.mouseY, p5.pmouseX , p5.pmouseY);
    //   // p5.line(p5.mouseX , p5.mouseY, p5.mouseX , p5.mouseY);
    // }
    if (update && !clear) { 
      // p5.line(p5.mouseX, p5.mouseY, p5.pmouseX , p5.pmouseY);
      p5.line(pos[0], pos[1], prevPos[0] , prevPos[1]);
      setPrevPos(pos);
      setUpdate(false);
    }
  };

	return <>
    <Sketch setup={setup} draw={draw} />
    <WebSocketNext
          url="ws://localhost:8765"
          onOpen={() => console.log("Websocket open...")}
          onMessage={data => {
            console.log(data);
            const d = data.split(" ");
            setUpdate(true);
            setPos([Number(d[0]/100*window.innerWidth), Number(d[1]/100*window.innerHeight)]);
          }}
        />
    </>;

};