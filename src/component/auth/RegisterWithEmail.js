import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter  } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';


class RegisterWithEmail extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  loadFbLoginApi() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : "457987018302497",
                cookie     : true,  // enable cookies to allow the server to access the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.5' // use version 2.1
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount() {
        this.loadFbLoginApi();
    }

    testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
      });
    }

    statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      if (response.status === 'connected') {
        this.testAPI();
      } else if (response.status === 'not_authorized') {
          console.log("Please log into this app.");
      } else {
          console.log("Please log into this facebook.");
      }
    }

    checkLoginState() {
        window.FB.getLoginStatus(function(response) {
            console.log('MyResponse', response)
        this.statusChangeCallback(response);
      }.bind(this));
    }

    handleFBLogin() {
        window.FB.login(this.checkLoginState());
        }

    render() {
        return (
                <div>
                    <button
                        classnames = "btn-facebook"
                        id         = "btn-social-login"
                        onClick = {this.handleFBLogin}
                        >
                        <span className="fa fa-facebook"></span> Luis Sign in with Facebook
                    </button>
                </div>
               );
    }
}

// class RegisterWithEmail extends Component{
//     constructor(){
//         super();
//         this.state = {
//             name: '',
//             image: null,
//             imageName: 'Choose file',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             errors: {}
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
    
//     componentDidMount(){
//       window.scrollTo(0,0);
//       if(this.props.auth.isAuthenticated){
//         this.props.history.push('/portfolio');
//       }
//     }
    
//     componentWillReceiveProps(nextProps){
//       console.log('nextProps registe component', nextProps.errors)
//         if(nextProps.errors){
//             this.setState({errors: nextProps.errors});
//         }
//     }

//     fileSelectedHandler = e => {
//       if(e.target.files[0]){
//           this.setState({ image: e.target.files[0] });
//           this.setState({ imageName: e.target.files[0].name });
//       }
//     }
    
//     onChange(e){
//         this.setState({[e.target.name]: e.target.value});
//     }
    
//     onSubmit(e){
//         e.preventDefault();
//         const newUser = new FormData();
//         newUser.append('name', this.state.name);
//         newUser.append('image', this.state.image);
//         newUser.append('email', this.state.email);
//         newUser.append('password', this.state.password);
//         newUser.append('confirmPassword', this.state.confirmPassword);
        
//         this.props.registerUser(newUser, this.props.history);
//     }
    
//     render(){
//         const {errors} = this.state;
//         console.log('state', this.state);
        
//         return(
//             <div className="register">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-md-8 m-auto">
//                       <h1 className="display-4 text-center">Sign Up With an Email</h1>
//                       <form noValidate onSubmit={this.onSubmit}>
//                         <div className="form-group">
//                           <input type="text"
//                             className={classnames('form-control form-control-lg', {
//                               'is-invalid': errors.name
//                             })}
//                             placeholder="Name"
//                             name="name"
//                             value={this.state.name}
//                             onChange={this.onChange} />
//                             {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="text">Upload Image Profile <span className="small">(Optional but recommended)</span></label>
//                             <div className="input-group mb-3">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text"></span>
//                                 </div>
//                                 <div className="custom-file">
//                                     <input 
//                                         type="file"
//                                         className="custom-file-input"
//                                         id="inputGroupFile01"
//                                         onChange={this.fileSelectedHandler}/>
//                                     <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imageName}</label>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="form-group">
//                           <input type="email"
//                             className={classnames('form-control form-control-lg', {
//                               'is-invalid': errors.email
//                             })}
//                             placeholder="Email Address"
//                             name="email"
//                             value={this.state.email}
//                             onChange={this.onChange} />
//                             {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
//                         </div>
//                         <div className="form-group">
//                           <input type="password"
//                             className={classnames('form-control form-control-lg', {
//                               'is-invalid': errors.password
//                             })}
//                             placeholder="Password"
//                             name="password"
//                             value={this.state.password}
//                             onChange={this.onChange} />
//                             {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
//                         </div>

//                         <div className="form-group">
//                           <input type="password"
//                             className={classnames('form-control form-control-lg', {
//                               'is-invalid': errors.confirmPassword
//                             })}
//                             placeholder="Confirm Password"
//                             name="confirmPassword"
//                             value={this.state.confirmPassword}
//                             onChange={this.onChange} />
//                             {errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
//                         </div>
//                         <input type="submit" className="btn btn-info btn-block mt-4" />
//                       </form>

//                       <div className="space-top text-center">
//                         <p className={classnames('form-control noColor', {'is-invalid': errors.email})}></p>
//                         {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//         );
//     }
// }

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(RegisterWithEmail));  