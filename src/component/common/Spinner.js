import React from 'react';

const Spinner = () => {
    return(
        <div class="text-center my-5" >
            <div className="spinner-border text-danger spinner-size" role="status">
                
            </div>
            <p className="color-p h2 mt-3">Loading...</p>
        </div>
        
    );
};

export default Spinner;