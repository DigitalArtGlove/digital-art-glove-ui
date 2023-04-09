import React from 'react';
import styles from '../styles/Home.module.css'
import EraseIcon from './eraseIcon';

const sizeBox = (props) => {
  let box = null;
  let size = props.size;

  box = <div className={styles.sizeBox}
    style = {{
      width: {size}+'px',
      height: {size}+'px'
    }}></div>;

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
          height: (size)+'px'
        }}></div>
      </div>
    );
  }
}

export default sizeBox;
