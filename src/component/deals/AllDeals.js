import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import noAvailable from '../../img/noAvailable.png';

const AllDeals = ({ data }) => {
    const noDealMesage = (
        <div className="col-12 my-5">
            <h5 className="color-p text-center h2">No Deal Found Yet</h5>
        </div>
    );

    const dealsList = (
        !data ? (
            <div className="col-12">
                <Spinner />
            </div>
        ) : (
            data.length === 0 ? (
                noDealMesage
            ) : (
                data.map((item, key) => {
                    return (
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center space-down" id="dealPadding" key={key}>
                            <div className="flex flex--column card groupCard groupDeals">
                                <div className="flex-item flex-item--shrink"
                                    aria-label="Awesome Events" role="img">
                                    <Link to={`/deal/${item._id}`}>
                                        <img src={item.image ? item.image : noAvailable} className="figure-img img-fluid rounded" alt="deal"/>
                                    </Link>
                                </div>
                                <div className="space-all">
                                <p className="text--sectionTitle">{item.name}</p>
                                    <div className="container2 d-flex align-items-center">
                                        <figcaption className="figure-caption container2-item"><i className="far fa-thumbs-up"></i> {item.likes.length} Likes</figcaption>
                                        <Link to={`/deal/${item._id}`} className="btn btn-primary btn-details">
                                            Details
                                        </Link>
                                    </div>
                                    <p className={"m-0 text-l font-italic " + (item.price === 0 ? "text-danger" : "text-success")}>
                                        {item.price === 0 ? "Free" : "$" + item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            )
        )
    )
    return(
        <div className="row">
            { dealsList}
        </div>
    )
}

export default AllDeals;