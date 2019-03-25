// UserProfile update image
//  update image

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import 'react-toastify/dist/ReactToastify.css';

import { postDeal } from '../../actions/addPostDeal';
import userImage from '../../img/userProfile.jpg'; 
// import starBash from '../../img/starBash2.png'; 
import starBash from '../../img/starBash.png'; 

class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
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
        const userId = this.props.match.params.id;
        
        const graphqlQuery = {
            query: `
                query{
                  userById(id:"${userId}"){
                    name
                    image
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
                this.setState({userData: resData.data.userById});
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
    updateUSerInfo() {

    }
    
    
    render(){
        const { err } = this.state
        return(
            <div className="constainer text-center">
                <div className="text-right">
                    <button className="btn-reaction disabled " onClick={this.updateUSerInfo.bind(this)}>Edit profile</button>
                </div>
                <div className="card-body backgroundProfile profile-text">
                    <img src={ this.state.userData.image ? this.state.userData.image : userImage } className="thumbnail-user-profile" alt="Responsive" />
                    <h5 className="card-title">{ this.state.userData.name }</h5>
                    <p className="card-text">NYC community Advocator</p>
                    <p className="btn btn-primary">Level: Legendary</p>
                </div>
                <div className="card-footer">
                    <img src={starBash} className="start-img" alt="Responsive" />
                    <img src={starBash} className="start-img" alt="Responsive" />
                    <img src={starBash} className="start-img" alt="Responsive" />
                </div>
            </div>        
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// export default UserProfile;

export default connect(mapStateToProps, {postDeal})(UserProfile);
