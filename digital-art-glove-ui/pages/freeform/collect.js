import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Collect = dynamic( () => import('react-p5'), { ssr: false } );

let x_coord = 0;
let y_coord = 1;

const MyCollect = (data) => {

    const [pos, setPos] = React.useState([]);
  
    const [clear, setClear] = React.useState(false);
    const [save, setSave] = React.useState(false); 
    const [notStartUp, setNotStartUp] = React.useState(false);

    let bubbles=[];

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
      p5.background(255);
      p5.colorMode(p5.RGB);

    }; 

    class Bubble {
        constructor(x,y,r,ox,oy) {
            this.ox = x;
            this.oy = y;
            this.x = x;
            this.y = y;
            this.r = r;
        }
        move () {
            if (data.select) {
                this.x = pos[x_coord];
                this.y = pos[y_coord];
            }
            if (data.collect) {
                this.x = this.ox;
                this.y = this.oy;
            }
        }
        changeColor(bright){
            this.brightness = bright;
        }
        show() {
            drawBubble(this.x, this.y, this.r)
        }
        // contains(px,py){
        //     let d = dist(px,py,this.x,this.y);
        //     if (d < this.r) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
       
    }

    function mousePressed () {
        let r = Math.random(10,80);
        // for (let i = bubbles.length - 1; i >= 0; i--) {
        //     if (bubbles[i].contains(pos[x_coord],pos[y_coord])) {
        //         bubbles.splice(i,1);
        //         break;
        //     }
        // }
        let b = new Bubble(pos[x_coord], pos[y_coord],r);
        bubbles.push(b);
    }

    function drawBubble(x,y,r) {
        showBubble(x,y,r)
    }
    

    const draw = (p5) => {
        const height = window.innerHeight;
        const width = window.innerWidth;

        function showBubble(x,y,r) {
            p5.stroke(0);
            p5.strokeWeight(4);
            p5.noFill();
            p5.ellipse(x,y,r*2);
        }
        
        p5.background(255);
        for (let i = 0; i < bubbles.length; i++){
            bubbles[i].move();
            bubbles[i].show();
        }
        if (data.select) {
            setNotStartUp(true);
            mousePressed();
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
        <Collect setup={setup} draw={draw} />
      );
    };

export default MyCollect;