// UserProfile update image
//  update image

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { postDeal } from '../../actions/addPostDeal';
import userImage from '../../img/userProfile.jpg'; 
// import starBash from '../../img/starBash2.png'; 
import starBash from '../../img/starBash.png'; 
import trophy from '../../img/trophy.png'; 
import { getUser } from '../../actions/authActions';

class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
            favoriteclass: false,
            userDealsclass: true,
            id: '5c9101a113d0e5000405d38c',
            company: '',
            name: '',
            price: '',
            category: '',
            image: null,
            imageName: 'Choose file',
            address: '',
            city: '',
            description: '',
            author: '',
            userData: '',
            err: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    
    componentDidMount(){
        window.scrollTo(0,0);
        const userId = this.props.match.params.id;
        this.props.getUser(userId);
        console.log("what", typeof(userId))

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
                    console.log('resData.data', resData.data.userById.favorites)
                    this.setState({favoritesList: resData.data.userById.favorites})
                }
                // dispatch({
                //     type: GET_USER,
                //     payload: resData.data.userById
                // });
            })
            .catch(err => {
                console.log(err);
            });
    }

    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleChangeCity(e) {
        this.setState({city: e.target.value});
    }

    handleChangeCategory(e) {
        this.setState({category: e.target.value});
    }
    
    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
    }
    
    // formData allows to append data to obj
    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('company', this.state.company);
        formData.append('price', this.state.price);
        formData.append('name', this.state.name);
        formData.append('category', this.state.category);
        formData.append('image', this.state.image);
        formData.append('location', this.state.address);
        formData.append('city', this.state.city);
        formData.append('description', this.state.description);
        formData.append('author', this.state.author);
        // this.props.postDeal(formData, this.props.history);
    }

    getFavoritesDeals(_this, p) {
        console.log('FAVORITES')
        if(this.state.favoriteclass){
            this.setState({
                userDealsclass: true,
                favoriteclass: false
            })
        }
        
    }

    getUserDeals(_this, p) {
        console.log('USED')
        if(this.state.userDealsclass){
            this.setState({
                userDealsclass: false,
                favoriteclass: true
            })
        }
    }
    render(){
        console.log('state', this.state)
        const { err } = this.state;
        const { userData } = this.props.auth;
        let btn_favorites = this.state.favoriteclass ? "noActiveButton": "activeButton";
        let btn_userDeals = this.state.userDealsclass ? "noActiveButton": "activeButton";
        return(
            <div className="container text-center">
                <div className="text-right">
                    <Link to={`${userData._id}/edit`} className="btn btn-primary">Edit profile</Link>
                </div>
                <div className="card-body backgroundProfile profile-text">
                    <span className="btn btn-primary userLabel"><i className="fa fa-star" aria-hidden="true"></i> Legendary</span>
                    <img src={ userData.image ? userData.image : userImage } className="mt-4 thumbnail-user-profile" alt="Responsive" />
                    <h4>
                        <i className="fas fa-medal space-top"></i> 
                        { userData.name}
                    </h4>
                    <h5 className="card-footer">Traveler, Dreamer, Art, Food, Sports</h5>
                    
                    <div className="row">
                        <div className="col-6 wh">
                            <button onClick={this.getFavoritesDeals.bind(this)} className={btn_favorites}>Deals Liked</button>
                        </div>
                        <div className="col-6 wh">
                            <button onClick={this.getUserDeals.bind(this)} className={btn_userDeals}>Deals Added</button>
                        </div>
                    </div>
                </div>

                <div className="container list-content">
                    {
                        this.state.favoritesList ? this.state.favoritesList.map((post, key) => {
                            let postId = post.id; 
                            return(
                                <div className="container listPostUser" key={key}>
                                    <div className="row ">
                                        <p className="col-2"><i className="fa fa-heart fa-1x" style={{"color":"red", "fontSize":"16px", "paddingRight": "5px"}}></i></p>
                                        <p className="col-8 text-left">{post.name} </p>
                                        {/* <p className="col-2"> <i className="fa fa-angle-double-right fa-1x"></i></p> */}

                                        <Link to={`/deal/${postId}`} className="col-2">
                                            <i className="fa fa-angle-double-right fa-1x"></i>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }): "You don't have post, go to the list and add posts to your favorite list "
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


export default connect(mapStateToProps, {getUser})(UserProfile);

