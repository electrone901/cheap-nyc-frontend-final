import React from 'react';
import classnames from 'classnames';

const TextInput = ({ type, placeholder, name, value, onChange, error }) => {
    return(
        <input
            type={type}
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange} />
    );
};

export default TextInput;