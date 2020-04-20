import React from 'react';

const PreviewDeal = ({ dealData, edit, loading, postDeal }) => {
    return(
        <div className="container">
            <div className="row text-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <h2 className="title">Confirm the information below</h2>
                </div>
            </div>
            {
                dealData.image ? (
                    <div className="col-12 text-center background">
                        <img className="imagePreview" src={dealData.imageFile} alt="previewImage"/>
                    </div>
                ): null
            }
            <div className="">
                <p> <span className="field-name"> Company Name: </span>{dealData.company}</p>
                <p> <span className="field-name"> Item name: </span>{dealData.name}</p>
                <p> <span className="field-name"> Category: </span> {dealData.category}</p>
                <p> <span className="field-name"> Item price: </span> {dealData.price}</p>
                <p> <span className="field-name"> Address: </span>{dealData.address}</p>
                <p> <span className="field-name"> City: </span>{dealData.city}</p>
                <p> <span className="field-name"> Product Description: </span>{dealData.description}</p>      
                <p> <span className="field-name"> Website: </span>{dealData.website ? dealData.website : "none"}</p>
            </div>
            <br/>
            <div className="row">
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn btn-info btn-block mt-4" onClick={edit}>Edit</button>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    { loading ? <p className="mt-4">Sending...</p> : 
                        <button className="btn btn-success btn-block mt-4" onClick={postDeal}>
                            Publish <i className="fa fa-check" aria-hidden="true"></i>
                        </button> }
                </div>
            </div>
            <hr/> 
        </div>
    );
}

export default PreviewDeal;