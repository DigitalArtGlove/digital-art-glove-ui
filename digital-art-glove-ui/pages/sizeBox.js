import React from 'react';
import styles from '../styles/Home.module.css'

const sizeBox = (props) => {
  let box = null;

  //replace with sensor data --> double flex activation + IMU roll for size
  let size = Math.min(Math.max((props.pos[0]-300), 5), 65);

  box = <div className={styles.sizeBox}
    style = {{
      width: (size)+'px',
      height: (size)+'px'
    }}></div>;

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

export default sizeBox;