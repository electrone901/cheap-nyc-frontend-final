import React, {Component} from 'react';
import  { Link } from 'react-router-dom';
import image2 from '../../img/stocks.png';
import Spinner from '../common/Spinner';
import { 
    FacebookShareButton, 
    WhatsappShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappIcon,
    TwitterIcon,
    EmailIcon,
    FacebookIcon, } from 'react-share';
 
class Deals extends Component{
    constructor() {
        super();
        this.state = {
            data: '',
            reviews: null,
            ad:'1200 Broadway Ave Manhattan'   
            //  Number Street Borougth, state, ZipCode
            // ad:'300 Jay St Brooklyn, NY 11201'
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
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
        const shareUrl = 'http://lazona.herokuapp.com/';
        const title = 'CheapNY: Best Deals of NY';
        console.log('this.state', this.state)        
      return(
          <div className="container">

            <div className="row justify-content-center">
                <div className="col-8 col-sm-8 col-md-8">
                    <h1>{this.state.data.name}  <span className="detail__price"> $ {this.state.data.price}</span></h1>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right">
                    <a href={`http://maps.google.com/?q=`+ this.state.ad} target="_blank" className="direcions">Get Directions</a>
                </div>
            </div>
            
            <div className="text-center background">
                <img src={this.state.data.image ? this.state.data.image: image2} className="img-thumbnail" alt="Responsive" />
            </div>

            <div className="row space-top">
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction">{} (0) Likes</button>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center container2">
                    
                    <button className="btn-reaction"> Share</button>
                    <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="btn-social">
                        <FacebookIcon
                        size={32}
                        round />
                    </FacebookShareButton>

                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="btn-social">
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    <EmailShareButton
                        url={shareUrl}
                        subject={title}
                        body={this.state.data.description}
                        className="btn-social">
                        <EmailIcon
                        size={32}
                        round />
                    </EmailShareButton>

                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="btn-social">
                        <TwitterIcon
                        size={32}
                        round />
                    </TwitterShareButton>

                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction">{} (0) Flag</button>
                </div>
            </div>


            <div className="space-top">
                <p> <span className="field-name"> Company Name: </span>{this.state.data.company}</p>
                <p> <span className="field-name"> Location: </span>{this.state.data.location}</p>
                <p> <span className="field-name"> Category: </span> {this.state.data.category}</p>
                <p> <span className="field-name"> Product Description: </span>{this.state.data.description}</p>          
            </div>
            <br/>
            {/* REVIEWS */}
            <div className="row">
                <div className="col-8 col-sm-8 col-md-8">
                    <h3>Reviews</h3>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right addReview">
                    <Link to={`/addReview/${this.state.data._id}`} className="btn btn-info">+ Add Review</Link>
                </div>
            </div>
            <hr/>
             
             {/* REVIEWS INFO FROM API */}
            {   
                this.state.data.reviews ? this.state.data.reviews.map((review, key) => {
                    var percentage = (review.rating * 20) + '%'; //calculate % rating 
                    return( 
                        <div>
                            <div className="row justify-content-center">

                                <div className="col-4 col-sm-4 col-md-4">
                                    <div className="">
                                        <img src={image2} alt="details" className="rounded-circle img-thumbnail thumbnail-review"/>
                                    </div>
                                    <div className="author-div">
                                        <p className="date"></p>
                                        <p className="author-name">{review.name}</p>
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
                }):<Spinner />
            }

            {/* MORE REVIEWS */}
            <div className="row justify-content-center">
                <button className="btn-info-helpful">See more reviews</button>
            </div>
                                
          </div>
      );
    }
}
export default (Deals);