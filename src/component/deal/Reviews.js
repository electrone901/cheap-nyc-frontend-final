import React from 'react';
import  { Link } from 'react-router-dom';

import userImage from '../../img/userProfile.jpg';

const Reviews = ({ post }) => {
    return(
        post.reviews.map((review, key) => {
            let percentage = (review.rating * 20) + '%'; //calculate % rating
            return(
                <div key={key}>
                    <div className="row justify-content-center">
                        <div className="col-4 col-sm-4 col-md-4">
                            <div className="">
                                <img src={review.image ? review.image: userImage} className="rounded-circle img-thumbnail thumbnail-review" alt="details" />
                            </div>
                            <div className="author-div">
                                <p className="date"></p>
                                <Link to={`/user/${review.userId}`} className="author-name">
                                    {review.name}
                                </Link>
                            </div>
                        </div>
        
                        <div className="col-8 col-sm-8 col-md-8">
                            <div className="authorRating">
                                <div className="back-stars">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    
                                    <div className="front-stars" style={{width : percentage}}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="comment">
                                <p>{review.text}</p>
                            </div>

                            <div className="helpful flex-container">
                                <div className="date">
                                    <p>Was this review helpful?</p>
                                </div>

                                <button className="btn btn-info-helpful">{} (0) Yes</button>
                        
                                <button className="btn btn-info-helpful">{} (0) No</button>
                            
                                <button className="date">Report</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        })
    )
}

export default Reviews;