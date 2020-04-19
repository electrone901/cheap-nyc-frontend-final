import React from 'react';
import classnames from 'classnames';

const TextInput = ({ label, type, placeholder, name, value, onChange, error }) => {
    return(
        <div className="form-group">
            <label className="font-weight-bold">{label || "Label"}</label>
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange} />
        </div>
    );
};

export default TextInput;