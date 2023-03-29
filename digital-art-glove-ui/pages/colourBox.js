import React from 'react';
import styles from '../styles/Home.module.css'

const ColourBox = (props) => {
  let box = null;

  let colourValue = props.colourValue

  switch(colourValue){
    case(0):
      box = <div className={styles.blackBox}></div>;
      break;
    case(1):
      box = <div className={styles.purpleBox}></div>;
      break;
    case(2):
      box = <div className={styles.blueBox}></div>;
      break;
    case(3):
      box = <div className={styles.pinkBox}></div>;
      break;
    default:
      box = <div className={styles.blackBox}></div>;
      break;
  }

  return box;
}

export default ColourBox;
