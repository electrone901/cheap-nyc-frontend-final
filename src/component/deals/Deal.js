import React, {Component} from 'react';
import  { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import noImage from '../../img/noImage.svg';
import userImage from '../../img/userProfile.jpg';

import Spinner from '../common/BigSpinner';
import { 
    FacebookShareButton, 
    WhatsappShareButton,
    TwitterShareButton,
    EmailShareButton,
    WhatsappIcon,
    TwitterIcon,
    EmailIcon,
    FacebookIcon, } from 'react-share';

import ReportPopUp from '../report/ReportPopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLike } from '../../actions/addLikeActions';
import { getDeal, removeADeal } from '../../actions/addPostDeal';

import ConfirmModal from '../common/ConfirmModal';
 
class Deals extends Component{
    constructor() {
        super();
        this.state = {
            data: '',
            errors: {}, 
            reviews: null
        };
    }

    togglePopup() {
        let itemId =  this.props.match.params.id;
        if(this.props.auth.isAuthenticated) {
            this.props.history.push(`/addReview/${itemId}`);
        }
        else {
            this.props.history.push("/login");
        }
    }

    reportPopup() {
        if(this.props.auth.isAuthenticated) {
            this.setState({
                reportPopup: !this.state.reportPopup
            });
        }
        else {
            this.notify();
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        let id = this.props.match.params.id;
        let url = `https://cnycserver.herokuapp.com/items/${id}`;
        this.props.getDeal(url, this.props.history);
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors.alreadyliked) {
            this.setState({errors: nextProps.errors});
            this.alreadylikedNotification();
        }
    }

    notify = () => {
        toast.error("To like/Report a post you must be logged in!");
    }

    alreadylikedNotification = () => {
        toast.error("You already liked this post!");
    }

    addLike() {
        let itemId =  this.props.match.params.id;
        if(!this.props.auth.isAuthenticated) {
            this.notify();
        }
        this.props.addLike(itemId, this.props.history);
    }

    addFlag() {
        if(this.props.auth.isAuthenticated) {
            // this.props.history.push(`/addReview/${itemId}`)
        }
        else {
            this.setState({
                showPopup: !this.state.showPopup
            });
        }
    }
    
    removeDeal(id){
        this.props.removeADeal(id, this.props.history);
    }

    render(){
        const { auth } = this.props;
        const { post } = this.props.postDeal;
        
        let likes = post.likes;
        let postId = this.props.match.params.id;
        let shareUrl = `http://cheapny.herokuapp.com/deal/${postId}`;    
        const title = `Hey, I think you would like it! You gotta check out this ${post.name} it’s SO COOL!!`;
        
        const EditButton = (
            <Link to={`/deal/${post._id}/edit`}>
                <button className="btn btn-outline-warning mr-1">Edit</button>
            </Link>
        );
        
        const DeleteButton = (
            <button className="btn btn-outline-danger" data-toggle="modal" data-target="#confirmModal">
                Delete
            </button>
        );

      return(
          <div className="container">
            <ToastContainer />
            <div className="row mt-3">
                <div className="col-12 col-lg-7 text-center background">
                    <img src={post.image ? post.image: noImage} className="img-thumbnail mb-3" alt="Responsive" />
                </div>

                <div className="col-12 col-lg-5">
                    <h1 className="color-p h2">{post.name}</h1>
                    <div className="mt-1">
                        {auth.user.id === post.userId ? EditButton : null}
                        {auth.user.id === post.userId ? DeleteButton : null}
                    </div>
                    <div className="row">
                        <button className="btn whenText field-name">When: </button>
                        <div className="col-4 text-center">
                            <button className="btn btn-block mt-4 eventDay">
                                <span>Start day:<br/> {post.startDate ? <Moment format="MM/DD/YYYY">{post.startDate}</Moment> : "TBA"}</span>
                            </button>
                        </div>
                        <div className="col-4 text-center">
                            <button className="btn btn-block mt-4 eventDay">
                                <span> End day:<br/> {post.endDate ? <Moment format="MM/DD/YYYY">{post.endDate}</Moment> : "TBA"}</span>
                            </button>
                        </div>
                    </div><br/>
                    <p> <span className="field-name"> Price: </span>${post.price}</p>
                    <p> <span className="field-name"> Company Name: </span>{post.company}</p>
                    <p> <span className="field-name"> Location: </span><a href={`http://maps.google.com/?q=`+ post.location} target="_blank" className="direcions">{post.location}</a></p>
                    <p> <span className="field-name"> Category: </span> {post.category}</p>
                    <p> <span className="field-name"> Product Description: </span>{post.description}</p>
                    <p> <span className="field-name"> Website: </span>{ post.website ? <a href={post.website} target="_blank">{post.website}</a> : "None"}</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction disabled" onClick={this.addLike.bind(this)}> <i className="fa fa-heart" style={{"color":"red", "fontSize":"16px", "paddingRight": "5px"}}></i>  ({likes ? likes.length: '0'}) Likes</button>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center container2">
                    <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="btn-social cursor-pointer">
                        <FacebookIcon
                        size={32}
                        round />
                    </FacebookShareButton>

                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="btn-social cursor-pointer">
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    <EmailShareButton
                        url={shareUrl}
                        subject={title}
                        body={post.description}
                        className="btn-social cursor-pointer">
                        <EmailIcon
                        size={32}
                        round />
                    </EmailShareButton>

                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="btn-social cursor-pointer">
                        <TwitterIcon
                        size={32}
                        round />
                    </TwitterShareButton>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction stylebutton" onClick={this.reportPopup.bind(this)}> Report</button>
                </div>
            </div>

            {/* ReportPopup */}
            <div className="container text-center"> 
                {
                    this.state.reportPopup ?
                    <ReportPopUp
                        title= 'I would like to report this post because'
                        closePopup ={this.reportPopup.bind(this)}
                        id={this.props.match.params.id}
                    />
                    : null
                }
            </div>

            <br/>
            {/* REVIEWS */}
            <div className="row">
                <div className="col-8 col-sm-8 col-md-8">
                    <h3>Reviews</h3>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right addReview">
                    <button className="btn btn-info" onClick={this.togglePopup.bind(this)}>+ Add Review</button>
                </div>
            </div>
            <hr/>
             
             {/* REVIEWS INFO FROM API */}
            {   
                post.reviews ? post.reviews.map((review, key) => {
                    var percentage = (review.rating * 20) + '%'; //calculate % rating 
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
                }):<Spinner />
            }

            {/* MORE REVIEWS */}
            <div className="row justify-content-center">
                <button className="btn-info-helpful">See more reviews</button>
            </div>
            <ConfirmModal onClick={this.removeDeal.bind(this, post._id)} />
          </div>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    addLike: state.addLike,
    postDeal: state.postDeal
});

export default connect(mapStateToProps, { addLike, getDeal, removeADeal}) (withRouter(Deals));