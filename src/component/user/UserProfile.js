import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import userImage from '../../img/userProfile.jpg'; 
import { getUser, removeUserDeal } from '../../actions/authActions';

class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
            favoriteclass: false,
            userDealsclass: true,
            userData: '',
            favoritesList: [],
            dealsAdded: [],
            currentUser: "",
            err: {}
        };
    }

    getFavoritesDeals(userId) {
        // toggle userDealsclass && favoriteclass to active
        if(this.state.favoriteclass){
            this.setState({
                userDealsclass: true,
                favoriteclass: false
            })
        }
        // gets LikedDeals
        const graphqlQuery = {
            query: `
                query{
                    userById(id:"${userId}"){
                    favorites {
                        id
                        name
                        }
                    }
                }
                `
        };
        fetch('https://cnycserver.herokuapp.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
            .then(res => {
                return res.json();
            })
            .then(resData =>{
                if(resData.errors){
                    return console.log(resData.errors);
                }
                else {
                    this.setState({favoritesList: resData.data.userById.favorites})
                }
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    
    componentDidMount(){
        window.scrollTo(0,0);
        const userId = this.props.match.params.id;
        this.props.getUser(userId);
        this.getFavoritesDeals(userId);
        this.setState({ currentUser: this.props.auth.user.id})
    }
    
    getDealsAdded(_this, p) {
        if(this.state.userDealsclass){
            this.setState({
                userDealsclass: false,
                favoriteclass: true
            })
        }

        const userId = this.props.match.params.id;
        const graphqlQuery = {
            query: `
            query{
               userById(id: "${userId}") {
                   listOfPosts {
                       id
                       name
                   }
               } 
            }
            `
        };
        fetch('https://cnycserver.herokuapp.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if(resData.errors) {
                return console.log(resData.errors);
            }
            else {
                this.setState({dealsAdded: resData.data.userById.listOfPosts })
            }
        })
    }

    removeDealFromList(postId){
        const userId = this.props.match.params.id;
        const newList = this.state.dealsAdded;

        for(let i = 0; i < newList.length; i++){
            if(newList[0].id === postId){
                newList.splice(i, 1);
            }
        }

        this.props.removeUserDeal(userId, postId);
        this.setState({dealsAdded: newList })
    }

    render(){
        const { userData } = this.props.auth;
        let btn_favorites = this.state.favoriteclass ? "noActiveButton": "activeButton";
        let btn_userDeals = this.state.userDealsclass ? "noActiveButton": "activeButton";
        let dealsLiked = (
            this.state.favoritesList && this.state.favoritesList.length > 1 ? this.state.favoritesList.map((post, key) => {
                let postId = post.id; 
                return(
                    <div className="container listPostUser" key={key}>
                        <div className="row d-flex">
                            <p className="col-2">
                                <i className="fa fa-heart profile-icon red"></i>
                            </p>
                            <p className="col-8 profile-dealName">{post.name}</p>
                            <Link to={`/deal/${postId}`} className="col-2">
                                <i className="fas fa-clipboard-list profile-icon"></i>
                            </Link>
                        </div>
                    </div>
                )
            }): "Post Liked: 0️⃣  0️⃣  😿 😿 "
        );
        let  dealsAdded = (
            (this.state.dealsAdded && this.state.dealsAdded.length > 0 )? this.state.dealsAdded.map((post, key) => {
                let postId = post.id; 
                return(
                    <div className="container listPostUser" key={key}>
                        <div className="row ">
                            <p className="col-2">
                                <i className="fas fa-store profile-icon"></i>
                            </p>
                            <p className="col-7 profile-dealName">{post.name}</p>
                            <div className="col-3">
                                <Link to={`/deal/${postId}`}>
                                    <i className="fas fa-clipboard-list profile-icon mr-2"></i>
                                </Link>
                                { this.state.currentUser === this.props.match.params.id ? 
                                    <i
                                        className="fas fa-trash-alt profile-icon profile-icon__remove"
                                        onClick={() => this.removeDealFromList(postId)}></i> 
                                    : null }
                            </div>
                        </div>
                    </div>
                )
            }):  "Post Added: 0️⃣  0️⃣  😿 😿 "
        );
        let editBtn, editInterest;
        if(this.state.currentUser === this.props.match.params.id) {
            editBtn = <Link to={`/profile/${userData._id}/edit`} className="btn btn-primary">Edit profile</Link>
            editInterest = (<Link to={`/profile/${userData._id}/edit`} className="btn btn-primary">Add Interest</Link>)
        }
  
        return(
            <div className="container text-center">
                <div className="text-right">
                    { editBtn }
                </div>
                <div className="card-body backgroundProfile profile-text">
                    <span className="btn btn-primary userLabel">
                        { userData.point } <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <img src={ userData.image ? userData.image : userImage } className="mt-4 thumbnail-user-profile" alt="Responsive" />
                    <h4>
                        <i className="fas fa-medal space-top"></i> 
                        { userData.name }
                    </h4>

                    {
                       userData.title ?  <h6 className="card-footer">{userData.title}</h6>: editInterest
                    }
    
                    
                    <div className="row">
                        <div className="col-6 wh">
                            <button onClick={this.getFavoritesDeals.bind(this, userData._id)} className={btn_favorites}>Deals Liked</button>
                        </div>
                        <div className="col-6 wh">
                            <button onClick={this.getDealsAdded.bind(this)} className={btn_userDeals}>Deals Added</button>
                        </div>
                    </div>
                </div>

                {/* dealsLiked & dealsAdded */}
                <div className="container list-content">
                    {
                        this.state.favoritesList && (!this.state.favoriteclass) ? dealsLiked : dealsAdded
                    }
                </div>
            </div>        
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getUser, removeUserDeal })(UserProfile);