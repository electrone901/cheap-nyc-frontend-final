import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginUser } from '../../actions/authActions';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    notify = () => {
      toast.error("Please login first to continue 😀")
    }

    successfulLogin = () => {
      toast.success(`🚀  Login Successful!`)
    }
    componentDidMount(){
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
    
    render(){
      console.log('this.props.auth.user.name', this.props.auth.user.name)

        const { errors } = this.state;
        console.log('state', this.state)
        return(
            <div className="login">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <ToastContainer />
                      <h1 className="display-4 text-center">Log In</h1>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
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
                          <input
                            type="password"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.password
                            })}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange} />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                      </form>
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