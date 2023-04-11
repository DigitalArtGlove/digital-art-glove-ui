import React from 'react';

const ClearIcon = (props) => {

    return (
        <svg width="45" height="45" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.7777 22.7683V47.3128C43.7777 48.1781 43.0764 48.8794 42.2111 48.8794H8.78883C7.92359 48.8794 7.22217 48.1781 7.22217 47.3128V22.7683" stroke={props.colour} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.2783 38.435V22.7683" stroke={props.colour} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30.7222 38.435V22.7683" stroke={props.colour} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M49 12.3238H35.9444M35.9444 12.3238V3.44606C35.9444 2.58082 35.2431 1.87939 34.3778 1.87939H16.6222C15.757 1.87939 15.0556 2.58082 15.0556 3.44606V12.3238M35.9444 12.3238H15.0556M2 12.3238H15.0556" stroke={props.colour} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

export default ClearIcon;