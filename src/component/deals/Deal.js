import React, {Component} from 'react';
import  { Link } from 'react-router-dom';
import image2 from '../../img/stocks.png';

class Deals extends Component{
    constructor() {
        super();
        this.state = {
            data: '',
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        console.log('id', id);
        let url = `https://cnycserver.herokuapp.com/items/${id}`;
        console.log('url', url);
        fetch(url)
        .then(res => {
            console.log('res', res);
            return res.json();
        })
        .then((data) => {
            this.setState({data: data.item});
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
    }
    
    render(){
      return(
          <div className="container">

            <div className="row justify-content-center">
                <div className="col-8 col-sm-8 col-md-8">
                    <h1>{this.state.data.name}  <span className="detail__price"> $ {this.state.data.price}</span></h1>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right">
                    <Link to="/productDetails" className="directions ">Get Directions</Link>
                </div>
            </div>
            
            <div className="text-center background">
                <img src={image2} className="img-thumbnail" alt="Responsive" />
            </div>

            <div className="row space-top">
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction">{} (0) Likes</button>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction"><i className="fa fa-facebook-square fa"></i> Share</button>
                    
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction">{} (0) Flag it</button>
                </div>
            </div>


            <div className="space-top">
                <p> <span className="field-name"> Company Name:</span>{this.state.data.company}</p>
                <p> <span className="field-name"> Location:</span>{this.state.data.location}</p>
                <p> <span className="field-name"> Category:</span> {this.state.data.category}</p>
                <p> <span className="field-name"> Product Description:</span>{this.state.data.description}</p>          
            </div>

            <br/><br/>
            {/* REVIEWS */}
            <div className="row justify-content-center">
                <div className="col-8 col-sm-8 col-md-8">
                    <h3>Reviews</h3>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right">
                    <Link to="/addReview" className="btn btn-info">+ Add Review</Link>
                </div>
            </div>

            <hr/>
            
            {/* REVIEW  1 */}
            <div className="row justify-content-center">

                <div className="col-4 col-sm-4 col-md-4">
                    <div className="">
                        <img src={image2} alt="details" className="rounded-circle img-thumbnail thumbnail-review"/>
                    </div>
                    <div className="author-div">
                        <p className="date">5 months ago</p>
                        <p className="author-name">Luis Carbajal</p>
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
                            
                            <div className="front-stars" style={{width: "70%" }}>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div> 

                    <div className="comment">
                        <p>Must take course for anyone who has no prior programming language experience / is a beginner in python. Very informative and comprehensive course. Easy to understand.</p>
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


            {/* REVIEW  2 */}
            <div className="row justify-content-center">

                <div className="col-4 col-sm-4 col-md-4">
                    <div className="">
                        <img src={image2} alt="details" className="rounded-circle img-thumbnail thumbnail-review"/>
                    </div>
                    <div className="author-div">
                        <p className="date">5 months ago</p>
                        <p className="author-name">Luis Carbajal</p>
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
                            
                            <div className="front-stars" style={{width: "70%" }}>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div> 

                    <div className="comment">
                        <p>Must take course for anyone who has no prior programming language experience / is a beginner in python. Very informative and comprehensive course. Easy to understand.</p>
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

            {/* MORE REVIEWS */}
            <div className="row justify-content-center">
                <button className="btn-info-helpful">See more reviews</button>
            </div>
                                
          </div>
      );
    }
}
export default (Deals);