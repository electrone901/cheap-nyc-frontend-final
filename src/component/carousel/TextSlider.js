/******************************************************************************
Title           : LeftArrow.js
Description     : is the left arrow of our carousel  using font-awesome 
******************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';
// import '../../sass/main.scss';

// functional component
const TextSlider = () => {
    return (
        <div className="tParent">
            <div className="row">
                <div className="col text-center">
                    <h1 className="">Find the best NY deals</h1>
                    <p className="tParent__items__subTittle">Do more with less</p>
                    <Link to="/register" className="tParent__items__sign">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
export default TextSlider;


