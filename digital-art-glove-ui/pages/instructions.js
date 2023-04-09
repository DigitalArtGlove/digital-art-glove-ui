import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css'

import { Select }  from '../public/select.png';
import Erase from '../public/erase.png';
import Colour from '../public/colourChange.png';
import Size from '../public/sizeChange.png';
import Pause from '../public/pauseDraw.png';

export default function Instructions () {

    const [index, setIndex] = React.useState(0);

    function switchInstruction () {
        setIndex(index+1);
    }

    let myInterval = setInterval(switchInstruction, 2750);

    useEffect(() => {
        if (index==3)
        location.reload();
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
                        How to Draw:
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
                    <h1 className={styles.title}>
                        Instruction will fix later -b
                    </h1>
                    {/* <div className={styles.selectimg}>
                        <img src={Erase} alt='erase image'/>
                    </div> */}
                </main>
            </div>
        );
    } else {
        clearInterval(myInterval);
    }
    // } else if (index==2) {
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
    //                     2. temporary instruction page! will fix later -b
    //                 </h1>
    //                 {/* <div className={styles.selectimg}>
    //                     <img src={Erase} alt='erase image'/>
    //                 </div> */}
    //             </main>
    //         </div>
    //     );
    // } else if (index==3) {
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
    //                     3. temporary instruction page! will fix later -b
    //                 </h1>
    //                 {/* <div className={styles.selectimg}>
    //                     <img src={Pause} alt='pause draw'/>
    //                 </div> */}
    //             </main>
    //         </div>
    //     );
    // } else if (index==4) {
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
    //                     4. temporary instruction page! will fix later -b
    //                 </h1>
    //                 {/* <div className={styles.selectimg}>
    //                     <img src={Colour} alt='colour change'/>
    //                 </div> */}
    //             </main>
    //         </div>
    //     );
    // } else if (index==5) {
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
    //                     5. temporary instruction page! will fix later -b
    //                 </h1>
    //                 {/* <div className={styles.selectimg}>
    //                     <img src={Size} alt='size change'/>
    //                 </div> */}
    //             </main>
    //         </div>
    //     );
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
