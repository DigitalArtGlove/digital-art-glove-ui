import React from 'react';

const BackArrow = (props) => {

    return (
        <svg width="45" height="35" viewBox="0 0 430 406" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M409.5 230C420.546 230 429.5 221.046 429.5 210C429.5 198.954 420.546 190 409.5 190V230ZM409.5 190H29.5V230H409.5V190Z" fill={props.colour}/>
            <path d="M205.5 20L20.5 205" stroke={props.colour} strokeWidth="40" strokeLinecap="round"/>
            <path d="M20 206.5L199.5 386" stroke={props.colour} strokeWidth="40" strokeLinecap="round"/>
        </svg>
    )
};

export default BackArrow;