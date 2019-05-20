import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter  } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { registerUser } from '../../actions/authActions';

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
      window.scrollTo(0,0);
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/portfolio');
      }
    }
    
    componentWillReceiveProps(nextProps){
      console.log('nextProps registe component', nextProps.errors)
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
    
    render(){
        const {errors} = this.state;
        console.log('state', this.state);
        
        return(
            <div className="register">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Sign Up</h1>
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input type="text"
                            className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.name
                            })}
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange} />
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
                          <input type="email"
                            className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.email
                            })}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange} />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                          <input type="password"
                            className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange} />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>

                        <div className="form-group">
                          <input type="password"
                            className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.confirmPassword
                            })}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.onChange} />
                            {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                      </form>
                      <GoogleLogin
                        clientId="184360858902-603v5ilaulroccoqu945ejg1vhrnvdnu.apps.googleusercontent.com"
                        buttonText="Sign Up with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
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