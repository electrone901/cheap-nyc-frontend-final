import React from 'react';

const FileInput = ({ label, name, value, onChange }) => {
    return(
        <div className="form-group">
            <label htmlFor="text"><strong>{label}</strong></label>
            <div className="input-group mb-3">
                <div className="custom-file">
                    <input 
                        type="file"
                        className="custom-file-input"
                        name={name}
                        onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="inputGroupFile01">{value}</label>
                </div>
            </div>
        </div>
    );
};

export default FileInput;