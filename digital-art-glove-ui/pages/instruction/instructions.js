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

    function switchInstruction () {
        setIndex(index+1);
    }

    let myInterval = setInterval(switchInstruction, 3500);

    useEffect(() => {
        if (index==7) {
            location.reload();
        }
    },[index]);

    if (index==0) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <h1 className={styles.title}>
                        Get Ready!
                    </h1>
                </main>
            </div>
        );
    } else if (index==1) {
        // clearInterval(myInterval);
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <h1 className={styles.title}>
                        How to use the Glove:
                    </h1>
                    {/* <div className={styles.selectimg}>
                        <img src={Erase} alt='erase image'/>
                    </div> */}
                </main>
            </div>
        );
    } else if (index==2) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <div className={styles.instruction}>
                        <div className={styles.instructionBox}>
                            <h2 className={styles.subtitle}>
                                To select, touch your middle finger to your thumb once.
                            </h2>
                            <h2 className={styles.subtitle}>
                                To draw, hold your middle finger to your thumb.
                            </h2>
                        </div>
                        <div className={styles.instructionImage}>
                            <Image src={Select} alt='select and draw'/>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else if (index==3) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <div className={styles.instruction}>
                        <div className={styles.instructionBox}>
                            <h2 className={styles.subtitle}>
                                To stop drawing, let go of your fingers and open your hand.
                            </h2>
                        </div>
                        <div className={styles.instructionImage}>
                            <Image src={Pause} alt='pause draw'/>
                        </div>
                    </div>
                </main> 
            </div>
        );
    } else if (index==4) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <div className={styles.instruction}>
                        <div className={styles.instructionBox}>
                            <h2 className={styles.subtitle}>
                                To erase, press and hold your ring finger to your thumb.
                            </h2>
                            {/* <h2 className={styles.subtitle}>
                                Move the cursor over the parts of the drawing you want to erase.
                            </h2> */}
                        </div>
                        <div className={styles.instructionImage}>
                            <Image src={Erase} alt='erase drawing'/>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else if (index==5) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <div className={styles.instruction}>
                        <div className={styles.instructionBox}>
                            <h2 className={styles.subtitle}>
                                To change brush colours, tap your pinky to your thumb and cycle through the available colours.
                            </h2>
                        </div>
                        <div className={styles.instructionImage}>
                            <Image src={Colour} alt='colour change'/>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else if (index==6) {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Digital Art Glove</title>
                    <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main} id="main">
                    <div className={styles.instruction}>
                        <div className={styles.instructionBox}>
                            <h2 className={styles.subtitle}>
                                To change the size of the brush, open your hand.
                            </h2>
                            <h2 className={styles.subtitle}>
                                Rotate clockwise to increase the size and counter-clockwise to decrease.
                            </h2>
                        </div>
                        <div className={styles.instructionImage}>
                            <Image src={Size} alt='size change'/>
                        </div>
                    </div>
                </main>
            </div>
        );
    } else {
        clearInterval(myInterval);
    }
   
    // } else {
    //     clearInterval(myInterval);
    //     return (
    //         <div className={styles.container}>
    //             <Head>
    //                 <title>Digital Art Glove</title>
    //                 <meta name="description" content="UI for 2022 IGEN 430 Digital Art Glove Project" />
    //                 <meta name="viewport" content="width=device-width, initial-scale=1" />
    //                 <link rel="icon" href="/favicon.ico" />
    //             </Head>
    //             <main className={styles.main} id="main">
    //                 <h1 className={styles.title}>
    //                     Get Ready!!
    //                 </h1>
    //                 {/* <div className={styles.selectimg}>
    //                     <img src={Size} alt='size change'/>
    //                 </div> */}
    //             </main>
    //         </div>
    //     );
    // }
}
