import React from 'react';

const SearchBar = ({ name, value, placeholder, onChange, onKeyPress, btnLabel, onClick }) => {
    return(
        <div className="input-group my-3">
            <input
                type="text"
                name={name}
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyPress={onKeyPress} />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={onClick}>
                    {btnLabel}
                </button>
            </div>
        </div>
    );
};

export default SearchBar;