/******************************************************************************
Title           : Slide.js
Description     : React component that contains the actual image we want to display
******************************************************************************/
import React from 'react';
// import '../../sass/main.scss';

// functional component is basically a function
const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: '100% 100%',
    backgroundPosition: 'center',
    
  }
  return <div className="slide" style={styles}></div>
}

export default Slide;




