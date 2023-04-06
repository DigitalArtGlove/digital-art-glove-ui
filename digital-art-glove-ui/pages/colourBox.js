import React from 'react';
import styles from '../styles/Home.module.css'

const ColourBox = (props) => {
  let box = null;

  let colourValue = props.colourValue;
  let pos = props.pos;

  switch(colourValue){
    case(0):
      box = <div className={styles.blackBox}
        style = {{
          outlineColor: 'black',
        }}></div>;
      break;
    case(1):
      box = <div className={styles.purpleBox}
        style = {{
          border: 'black',
        }}></div>;
      break;
    case(2):
      box = <div className={styles.blueBox}
        style = {{
          border: 'black',
        }}></div>;
      break;
    case(3):
      box = <div className={styles.pinkBox}
        style = {{
          border: 'black',
        }}></div>;
      break;
    default:
      box = <div className={styles.blackBox}
        style = {{
          border: 'black',
        }}></div>;
      break;
  }

  return box;
}

export default ColourBox;
