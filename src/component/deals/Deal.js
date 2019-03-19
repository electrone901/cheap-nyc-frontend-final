import React, {Component} from 'react';
import  { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { stat } from 'fs';
import ReviewPopup from '../review/ReviewPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLike } from '../../actions/addLikeActions';
import { getDeal } from '../../actions/addPostDeal';
 
class Deals extends Component{
    constructor() {
        super();
        this.state = {
            data: '',
            reviews: null
        }
    }

    togglePopup() {
        let itemId =  this.props.match.params.id
        if(this.props.auth.isAuthenticated) {
            console.log('YES is Authenticated');
            this.props.history.push(`/addReview/${itemId}`)
        }
        else {
            this.setState({
                showPopup: !this.state.showPopup
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        let id = this.props.match.params.id;
        let url = `https://cnycserver.herokuapp.com/items/${id}`;
        
        this.props.getDeal(url);
    }

    // WAY TO DISABLED LIKE BUTTON
    componentWillReceiveProps(nextProps) {
        if(!nextProps.error) {
            this.setState({errors: nextProps.errors})
        }
        else {
            console.log('change color here');
        }
    }

    notify = () => {
        toast.error("To like/flag a post you must be logged in!")
    }

    addLike() {
        let itemId =  this.props.match.params.id;
        if(this.props.auth.isAuthenticated) {
            this.props.addLike(itemId, this.props.history)
        }
        else {
            this.notify();
        }

        // const token = localStorage.getItem('jwtToken');
        // let itemId =  this.props.match.params.id

        // if(this.props.auth.isAuthenticated) {
        //     fetch(`https://cnycserver.herokuapp.com/items/${itemId}/like`, {
        //         method: 'PUT',
        //         headers: {
        //             'Authorization': token,
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(resData => console.log(resData))
        //     .catch(err => console.log(err))
        // }
        // else {
        //     this.notify();
        // }
    }

    addFlag() {
        const token = localStorage.getItem('jwtToken');
        let itemId =  this.props.match.params.id
        if(this.props.auth.isAuthenticated) {
            fetch(`https://cnycserver.herokuapp.com/items/${itemId}/flag`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
            .then(resData => console.log(resData))
            .catch(err => console.log(err))
        }
        else {
            this.notify();
        }
    }
    disable() {

    }
    
    render(){
        const { post } = this.props.postDeal;
        
        let flags = post.flags;
        let likes = post.likes;
        const shareUrl = 'http://lazona.herokuapp.com/';
        const title = 'CheapNY: Best Deals of NY';


        // CHECK IF USER LIKED/FLAGGED POST
        let showHideLikeButton;
        if(this.state.data) {
            let arrayLikes =  this.state.data.likes;
            let userId =  this.props.auth.user.id;
            showHideLikeButton 
            console.log('arrayLikes', arrayLikes, 'includes', arrayLikes.includes(userId))
            // this.setState({
            //     showHideLikeButton: arrayLikes.includes(userId)
            // })
        }

        console.log('state', this.state)
        console.log('props', this.props)
        // let showHideLikeButton;
        // if(this.state.data) {
        //     let arrayLikes =  this.state.data.likes;
        //     let userId =  this.props.match.params.id;
        // console.log('arrayLikes', arrayLikes) 
        // console.log('includes', arrayLikes.includes(userId));
        // }
        
      return(
          <div className="container">

            <div className="row justify-content-center">
                <div className="col-8 col-sm-8 col-md-8">
                    <h1>{post.name}  <span className="detail__price"> $ {post.price}</span></h1>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right">
                    <a href={`http://maps.google.com/?q=`+ post.location} target="_blank" className="direcions">Get Directions</a>
                </div>
            </div>
            <ToastContainer />
            <div className="text-center background">
                <img src={post.image ? post.image: image2} className="img-thumbnail" alt="Responsive" />
            </div>

            <div className="row space-top">
            {/* disabled

            <div className="col-4 col-sm-4 col-md-4 text-center">
                <button className="btn-reaction" onClick={this.disable.bind(this)}>({likes ? likes.length: '0'}) disable</button>
            </div> */}



                {/* <button className="btn btn-secondary" disabled>disabled</button>


                <div className="col-4 col-sm-4 col-md-4 text-center">
                    {

                    }
                    <button className="btn-reaction disabled" onClick={this.addLike.bind(this)}>({likes ? likes.length: '0'}) Likes</button>
                </div> */}







                <div className="col-4 col-sm-4 col-md-4 text-center">
                    <button className="btn-reaction disabled" onClick={this.addLike.bind(this)}>({likes ? likes.length: '0'}) Likes</button>
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
                        body={post.description}
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
                    <button className="btn-reaction" onClick={this.addFlag.bind(this)}>({flags ? flags.length: '0'}) Flag</button>
                </div>
            </div>

            {/* showPopup */}
            <div className="container text-center"> 
                {
                    this.state.showPopup ?
                    <ReviewPopup
                        title= 'POST AS'
                        text= 'Post as a member is reccomend'
                        closePopup ={this.togglePopup.bind(this)}
                        id={this.props.match.params.id}
                    />
                    : null
                }
            </div>


            <div className="space-top">
                <p> <span className="field-name"> Company Name: </span>{post.company}</p>
                <p> <span className="field-name"> Location: </span>{post.location}</p>
                <p> <span className="field-name"> Category: </span> {post.category}</p>
                <p> <span className="field-name"> Product Description: </span>{post.description}</p>          
            </div>
            <br/>
            {/* REVIEWS */}
            <div className="row">
                <div className="col-8 col-sm-8 col-md-8">
                    <h3>Reviews</h3>
                </div>
                <div className="col-4 col-sm-4 col-md-4 text-right addReview">
                    <button className="btn btn-info" onClick={this.togglePopup.bind(this)}>+ Add Review</button>

                    {/* <Link to={`/addReview/${this.state.data._id}`} className="btn btn-info">+ Add Review</Link> */}
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    addLike: state.addLike,
    postDeal: state.postDeal
});

export default connect(mapStateToProps, { addLike, getDeal}) (withRouter(Deals));