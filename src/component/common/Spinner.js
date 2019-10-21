import React from 'react';
import spinner from './spinner.gif';

export default () => {
    return(
        <div className="col-lg-12 col-md-12 col-sm-12">
            <img
                src={spinner}
                alt="Loading..."
                className="spinner"
            />
        </div>
    );
};