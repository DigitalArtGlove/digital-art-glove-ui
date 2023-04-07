import React from 'react';
import styles from '../styles/Home.module.css'

const ColourBox = (props) => {
  let colourValue = props.colourValue;

  return (
    <div className={styles.colourContainer}>
      <div className={styles.blackBox}
        style = {{
          borderStyle: colourValue == 0 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.purpleBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.blueBox}
        style = {{
          borderStyle: colourValue == 2 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.pinkBox}
        style = {{
          borderStyle: colourValue == 3 ? 'solid' : 'none',
        }}>
      </div>
      {/* <div className={styles.redBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.orangeBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.yellowBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.greenBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.darkBlueBox}
        style = {{
          borderStyle: colourValue == 1 ? 'solid' : 'none',
        }}>
      </div>
      <div className={styles.blueBox}
        style = {{
          borderStyle: colourValue == 2 ? 'solid' : 'none',
        }}>
      </div> */}
    </div>
  );
}

export default ColourBox;
