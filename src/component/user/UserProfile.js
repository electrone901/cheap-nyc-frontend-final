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
        
        this.props.getUser(userId);
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
        const { err } = this.state;
        const { userData } = this.props.auth;
        const line = <p>.</p>
        
        return(
            <div className="container text-center">
                <div className="text-right">
                    <Link to={`${userData._id}/edit`} className="btn btn-primary">Edit profile</Link>
                </div>
                <div className="card-body backgroundProfile profile-text">
                    <span className="btn btn-primary userLabel"><i class="fa fa-star" aria-hidden="true"></i> Legendary</span>
                    <img src={ userData.image ? userData.image : userImage } className="mt-4 thumbnail-user-profile" alt="Responsive" />
                    <h4>
                        <i className="fas fa-medal space-top"></i> 
                        { userData.name}
                    </h4>
                    <h5 className="card-footer">Traveler, Dreamer, Art, Food, Sports</h5>
                    
                    <div className="row">
                        <div className="col-4">
                            Favorites
                            {line}
                        </div>
                        <div className="col-4">
                            Used
                            {line}
                        </div>
                        <div className="col-4 wh">
                            Added
                            {line}
                        </div>
                    </div>
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

export default connect(mapStateToProps, {getUser})(UserProfile);
