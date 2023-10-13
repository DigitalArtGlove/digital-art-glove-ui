import React from 'react';
import styles from '../styles/Home.module.css'
import EraseIcon from './eraseIcon';

const colourValues = {0:"0 0 0", 1:"135 40 237", 2:"25 175 250", 3:"222 22 212" };

const sizeBox = (props) => {
  let size = props.size;
  let colourIndex = props.colourIndex;

  if (props.erase) {
    return (
      <div className={styles.sizeBoxOutline}>
        <EraseIcon className={styles.eraseButton}/>
      </div>
    )
  } else {
    return (
      <div className={styles.sizeBoxOutline}>
        <div className={styles.sizeBox}
        style = {{
          width: (size)+'px',
          height: (size)+'px',
          backgroundColor: 'rgb('+colourValues[colourIndex]+')'
        }}></div>
      </div>
    );
  }
}

export default sizeBox;
