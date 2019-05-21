import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>{
    return (
        <div>
            <h1 className="text-center my-5">Page Not Found</h1>
            <p className="text-center my-5">Click <Link to="/">here</Link> to go to home page.</p>
        </div>
    );
};

export default NotFound;