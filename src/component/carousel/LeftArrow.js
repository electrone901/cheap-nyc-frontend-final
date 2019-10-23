/******************************************************************************
Title           : LeftArrow.js
Description     : is the left arrow of our carousel  using font-awesome 
******************************************************************************/

import React from 'react';

// functional component
const LeftArrow = (props) => {
    return (
        <div className="backArrow arrow" onClick={props.goToPrevSlide}>
            <i className="fa fa-arrow-left fa-2x" arial-hidden="true"></i>
        </div>
    )
}
export default LeftArrow;


