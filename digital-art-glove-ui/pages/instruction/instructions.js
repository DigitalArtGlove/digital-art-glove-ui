import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import Select from './select.png';
import Erase from './erase.png';
import Colour from './colourChange.png';
// import Size from './sizeChange.png';
import Pause from './pauseDraw.png';
import Size from './openHandSizeChange.png';

export default function Instructions () {
    
    const [index, setIndex] = React.useState(0);

    let myInterval = setInterval(() => {
        setIndex(index+1);
    }, 3500);

    useEffect(() => {
        if (index==7) {
            clearInterval(myInterval);
            location.reload();
        }
    },[index]);

    // let i=0;
    // while (i<7){
    //     setInterval(()=>{
    //         i++;
    //         console.log(i);
    //     },3000);
    // }

    return (
        <div className={styles.container}>
            <Head>
                <title>Digital Art Glove</title>
                <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main} id="main">
                
                <div className={styles.instruction}
                     style={{
                        display: index == 0 ? 'flex' : 'none'
                    }}>
                    <h1 className={styles.title}>
                        Get Ready!
                    </h1>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 1 ? 'flex' : 'none'
                    }}>
                    <h1 className={styles.title}>
                        How to use the Glove:
                    </h1>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 2 ? 'flex' : 'none'
                    }}>
                    <div className={styles.instructionBox}>
                        <h2 className={styles.subtitle}>
                            To <bold className={styles.special}>select</bold>, touch your <bold className={styles.special}>middle finger</bold> to your <bold className={styles.special}>thumb</bold>.
                        </h2>
                        <h2 className={styles.subtitle}>
                            To <bold className={styles.special}>draw</bold>, hold your <bold className={styles.special}>middle finger</bold> to your <bold className={styles.special}>thumb</bold>.
                        </h2>
                    </div>
                    <div className={styles.instructionImage}>
                        <Image src={Select} alt='select and draw'/>
                    </div>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 3 ? 'flex' : 'none'
                    }}>
                    <div className={styles.instructionBox}>
                        <h2 className={styles.subtitle}>
                            To <bold className={styles.special}>stop</bold> drawing, <bold className={styles.special}>open</bold> your hand.
                        </h2>
                    </div>
                    <div className={styles.instructionImage}>
                        <Image src={Pause} alt='pause draw'/>
                    </div>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 4 ? 'flex' : 'none'
                    }}>
                    <div className={styles.instructionBox}>
                        <h2 className={styles.subtitle}>
                            To <bold className={styles.special}>erase</bold>, press and hold your <bold className={styles.special}>ring finger</bold> to your <bold className={styles.special}>thumb</bold>.
                        </h2>
                    </div>
                    <div className={styles.instructionImage}>
                        <Image src={Erase} alt='erase drawing'/>
                    </div>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 5 ? 'flex' : 'none'
                    }}>
                    <div className={styles.instructionBox}>
                        <h2 className={styles.subtitle}>
                            To cycle through brush <bold className={styles.special}>colours</bold>, tap your <bold className={styles.special}>pinky</bold>.
                        </h2>
                    </div>
                    <div className={styles.instructionImage}>
                        <Image src={Colour} alt='colour change'/>
                    </div>
                </div>

                <div className={styles.instruction}
                    style={{
                        display: index == 6 ? 'flex' : 'none'
                    }}>
                    <div className={styles.instructionBox}>
                        <h2 className={styles.subtitle}>
                            To change the <bold className={styles.special}>size</bold> of the brush, <bold className={styles.special}>open</bold> your hand.
                        </h2>
                        <h2 className={styles.subtitle}>
                            Rotate <bold className={styles.special}>clockwise to increase</bold> the size and <bold className={styles.special}>counter-clockwise to decrease</bold>.
                        </h2>
                    </div>
                    <div className={styles.instructionImage}>
                        <Image src={Size} alt='size change'/>
                    </div>
                </div>

            </main>
        </div>
    );
}