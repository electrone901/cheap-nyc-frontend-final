/******************************************************************************
Title           : RightArrow.js
Description     : is the right arrow of our carousel  using font-awesome 
******************************************************************************/

import React from 'react';

const RightArrow = (props) => {
    return (
        <div className="nextArrow arrow" onClick={props.goToNextSlide}>
            <i className="fa fa-arrow-right fa-2x" arial-hidden="true"></i>
        </div>
    )
}

export default RightArrow;