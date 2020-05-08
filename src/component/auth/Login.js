import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';

import { loginUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';

export const initGA = () => {
  ReactGA.initialize('UA-142224072-1');
}

export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: "false",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    notify = () => {
      toast.error("Please login to continue 🚀")
    }

    successfulLogin = () => {
      toast.success(`🚀  Login Successful!`)
    }
    
    componentDidMount(){
      initGA();
      loadPageView();
      window.scrollTo(0,0);
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/');
      }
      else {
        this.notify();
      }
    }
    
    componentWillReceiveProps(nextProps){
      if(nextProps.auth.isAuthenticated){
        this.successfulLogin();
        this.props.history.push('/');
      }
      if(nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        const userData  = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    }
    
    responseGoogle = (response) => {
      const userData  = {
        email:  response.profileObj.email,
        password: response.profileObj.googleId
      };
      this.props.loginUser(userData);
    };

    responseFacebook = (response) => {
      const userData  = {
        email:  response.email,
        password: response.userID
      };
      this.props.loginUser(userData);
    };

    render(){
        const { errors } = this.state;

        const socialMedia = (
          <div className="d-flex flex-column align-items-center jumbotron">
            <h2 className="color-p text-center mb-3">With Social Media</h2>
            <GoogleLogin
              className="googleLogin"
              clientId="184360858902-603v5ilaulroccoqu945ejg1vhrnvdnu.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'} />
            <FacebookLogin
              cssClass="facebookLogin"
              icon="fa-facebook"
              textButton=" Login with Facebook" 
              appId="2516650448368322"
              fields="name,email,picture"
              onClick = {this.onClick}
              callback={this.responseFacebook} />
          </div>
        );

        const form = (
          <div className="jumbotron">
            <h2 className="color-p mb-2">With Email</h2>
            <form onSubmit={this.onSubmit}>
              <TextInput
                label="Email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email} />
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              <TextInput
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password} />
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        )
        
        return(
            <div className="login">
              <div className="container">
                <h1 className="my-3 text-center">Log In</h1>
                <ToastContainer />
                <div className="row">
                  <div className="col-sm-12	col-md-6 col-lg-6">
                    {form}
                  </div>
                  <div className="col-sm-12	col-md-6 col-lg-6">
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

export default connect(mapStateToProps, {loginUser})(Login);
