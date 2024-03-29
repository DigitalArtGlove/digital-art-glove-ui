import React from 'react';

const SaveIcon = (props) => {

    return (
        <svg width="35" height="35" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 43.7778V7.22222C2 4.33807 4.33807 2 7.22222 2H36.3925C37.7774 2 39.1057 2.55019 40.0851 3.52956L47.4704 10.9149C48.4498 11.8943 49 13.2225 49 14.6076V43.7778C49 46.662 46.662 49 43.7778 49H7.22222C4.33807 49 2 46.662 2 43.7778Z" stroke={props.colour} strokeWidth="3"/>
            <path d="M16.6223 17.6667H34.3779C35.2432 17.6667 35.9446 16.9652 35.9446 16.1V3.56667C35.9446 2.70142 35.2432 2 34.3779 2H16.6223C15.7571 2 15.0557 2.70142 15.0557 3.56667V16.1C15.0557 16.9652 15.7571 17.6667 16.6223 17.6667Z" stroke={props.colour} strokeWidth="3"/>
            <path d="M9.8335 29.6775V48.9997H41.1668V29.6775C41.1668 28.8122 40.4655 28.1108 39.6002 28.1108H11.4002C10.5349 28.1108 9.8335 28.8122 9.8335 29.6775Z" stroke={props.colour} strokeWidth="3"/>
        </svg>

    )
};

export default SaveIcon;