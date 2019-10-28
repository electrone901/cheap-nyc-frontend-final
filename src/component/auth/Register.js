import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { registerUser } from '../../actions/authActions';
import ReactGA from 'react-ga';
import TextInput from '../common/TextInput';

export const initGA = () => {
  ReactGA.initialize('UA-142224072-1');
}

export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            image: null,
            imageName: 'Choose file',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
      initGA();
      loadPageView();
      window.scrollTo(0,0);
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/portfolio');
      }
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    fileSelectedHandler = e => {
      if(e.target.files[0]){
          this.setState({ image: e.target.files[0] });
          this.setState({ imageName: e.target.files[0].name });
      }
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        const newUser = new FormData();
        newUser.append('name', this.state.name);
        newUser.append('image', this.state.image);
        newUser.append('email', this.state.email);
        newUser.append('password', this.state.password);
        newUser.append('confirmPassword', this.state.confirmPassword);
        
        this.props.registerUser(newUser, this.props.history);
    }
    
    responseGoogle = (response) => {
      const newUser = new FormData();
      newUser.append('name', response.profileObj.givenName);
      newUser.append('image', response.profileObj.imageUrl);
      newUser.append('email', response.profileObj.email);
      newUser.append('password', response.profileObj.googleId);
      newUser.append('confirmPassword', response.profileObj.googleId);
      this.props.registerUser(newUser, this.props.history);
    };

    responseFacebook = (response) => {
      const newUser = new FormData();
      newUser.append('name', response.name);
      newUser.append('image', response.picture.data.url);
      newUser.append('email', response.email);
      newUser.append('password', response.userID);
      newUser.append('confirmPassword', response.userID);
      this.props.registerUser(newUser, this.props.history);
    }

    render(){
        const {errors} = this.state;

        const socialMedia = (
          <div className="d-flex flex-column align-items-center loginContainer space-top">
            <GoogleLogin
              className="googleLogin"
              clientId="184360858902-603v5ilaulroccoqu945ejg1vhrnvdnu.apps.googleusercontent.com"
              buttonText="Sign Up with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'} />
            <FacebookLogin
              cssClass="facebookLogin"
              icon="fa-facebook"
              textButton=" Sign up with Facebook" 
              appId="2516650448368322"
              onClick = {this.onClick}
              fields="name,email,picture"
              callback={this.responseFacebook} />
          </div>
        );

        const form = (
          <div className="loginContainer space-top">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group heightForm">
                <TextInput
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name} />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
              </div>

              <div className="form-group">
                  <label htmlFor="text">Upload Image Profile <span className="small">(Optional but recommended)</span></label>
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
              </div>

              <div className="form-group">
                <TextInput
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className="form-group">
                <TextInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password} />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>

              <div className="form-group">
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  error={errors.confirmPassword} />
                  {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
              <p className="agreement"> 
                When you "Sign Up", you agree to <Link to='/howItWorks' className="author-name"> Real CheapNY's Terms of Service</Link>, Privacy Policy, and Cookie Policy.
              </p>
            </form>     
         </div>
        )

        return(
            <div className="register">
                <div className="container">
                  <h1 className="login__title">Sign Up</h1>
                  <div className="row">
                    <div className="col-sm-12	col-md-5 col-lg-5 text-center space-top">
                      <h2 className="title text-center">With Email</h2>
                      {form}
                    </div>
                    <div className="col-sm-12	col-md-2 col-lg-2 text-center space-top">
                      <div className="d-flex flex-sm-row flex-md-column flex-sm-row justify-content-center align-items-center">
                        <div className="signup__line"></div>
                        <p className="mt-3 mx-3">OR</p>
                        <div className="signup__line"></div>
                      </div>
                    </div>
                    <div className="col-sm-12	col-md-5 col-lg-5 text-center space-top">
                      <h2 className="title text-center">With Social Media</h2>
                      {socialMedia}
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

export default connect(mapStateToProps, {registerUser})(withRouter(Register));  