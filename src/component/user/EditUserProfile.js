import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import CheckBox from './CheckBox';
import { getUser } from '../../actions/authActions';
import { changeUserImage, updateTitle} from '../../actions/userActions';
import userImage from '../../img/userProfile.jpg'; 

class EditUserProfile extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            image: null,
            imageFile: '',
            imageName: 'Choose file',
            err: {},  
            newUser: {
                skills: []
              },  
            title: '', 
            interestOptions: ["Sports", "Adventure", "Food", "Social", "Bars", "Photography", "Outdoor", "Indoor", "Events", "Concerts",
            "Theater", "Karaoke", "Movies", "Night Life", "Dancing", "Museums", "Party", "Games", "Biking", "Hiking"],
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
    }
    
    componentDidMount(){
        window.scrollTo(0,0);
        const userId = this.props.match.params.id;
        this.props.getUser(userId);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        if(nextProps.auth.userData){
            const { userData } = nextProps.auth;
            
            userData.name = userData.name ? userData.name : '';
            userData.image = userData.image ? userData.image : null;
            
            this.setState({
                name: userData.name,
                imageFile: userData.image
            });
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
        this.setState({
           file: file,
           imageFile: reader.result
         });
       };

       reader.readAsDataURL(file);
    }
    
    onSubmit(e, history){
        e.preventDefault();
        let userInterestInput = this.state.newUser.skills;
        let interestString = "";
        // get an interestString
        for(let i =0; i < userInterestInput.length; i++) {
            if(i === userInterestInput.length-1) interestString += userInterestInput[i];
            else {
                interestString += userInterestInput[i]+ ", ";
            }
          }


        const userId = this.props.match.params.id;
        const name = this.state.name ?  this.state.name: this.props.auth.user.name;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("title", interestString);
        this.props.updateTitle(userId, formData, this.props.history);
    }
    
    onSubmitImage(e){
        e.preventDefault();
        const userId = this.props.match.params.id;
        
        const formData = new FormData();
        formData.append('image', this.state.image);
       
        this.props.changeUserImage(userId, formData, this.props.history);
    }
    handleCheckBox(e) {
        const newSelection = e.target.value;
        let newSelectionArray;

        if (this.state.newUser.skills.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.newUser.skills.filter(
            s => s !== newSelection
            );
        } else {
            newSelectionArray = [...this.state.newUser.skills, newSelection];
        }

        this.setState(prevState => ({
            newUser: { ...prevState.newUser, skills: newSelectionArray }
        }));
    }

    render(){
        const { err } = this.state;
        return(
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="title text-center">Edit Name & Interests</h1>
                  <div className="loginContainer space-top">
                    <div className="col-10 m-auto">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="text">Your Name</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': err.name
                                    })}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                {err.name && (<div className="invalid-feedback">{err.name}</div>)}
                            </div>

                            <CheckBox
                                title={"Interests (select max 8)"}
                                name={"interests"}
                                options={this.state.interestOptions}
                                selectedOptions={this.state.newUser.skills}
                                handleChange={this.handleCheckBox}
                            />{" "}
                

                            <div className="checkbox">
                                    {
                                        this.state.interestArray ? this.state.interestArray.map((option, key)=> {
                                            return (
                                                <label htmlFor="text" className="checkbox-inline" key={key}>
                                                    <input 
                                                        type="checkbox"
                                                        id="myInterest"
                                                        name="myInterest"
                                                        onChange={this.handleCheckBox(option)}
                                                        value={option}
                                                        checked={this.handleCheckBox(option)}
                                                    >
                                                    </input>
                                                    {option}
                                                </label>
                                            )
                                        }): ""

                                    }
                            </div>
                            <input type="submit" className="btn btn-info btn-block" value="Update Information"/>
                        </form>
                    </div>
                  </div>
                  <hr className="space-top"/>

                  
                  <div className="loginContainer">
                  <h1 className="title text-center">Edit Image</h1>
                    <div className="col-md-10 m-auto">
                        <form onSubmit={this.onSubmitImage}>
                            <label htmlFor="text">Upload an image</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"></span>
                                </div>
                                <div className="custom-file">
                                    <input 
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        onChange={this.fileSelectedHandler}/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imageName}</label>
                                </div>
                            </div>
                            <div className="text-center">
                                <img src={this.state.imageFile ? this.state.imageFile : userImage} className="img-profile" alt="Preview User" />
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" value="Change Image"/>
                        </form>
                    </div>
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

export default connect(mapStateToProps, { getUser, changeUserImage, updateTitle })(EditUserProfile);
