/******************************************************************************
Title           : Slide.js
Description     : React component that contains the actual image we want to display
******************************************************************************/
import React from 'react';

// functional component is basically a function
const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    
  }
  return <div className="slide" style={styles}></div>
}

export default Slide;




