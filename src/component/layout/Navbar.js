import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../img/l3.png';
import Popup from '../deals/Popup';

import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: ''
    };
  }

  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }

  profile() {
    const { user } = this.props.auth;
    console.log('userLuis', user.id)
    this.props.history.push(`/profile/${user.id}`);
  }

  togglePopup() {
    
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/addDeal');
    }
    else {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
  }
  
  render() {
    const {isAuthenticated, user} = this.props.auth;
    // const nameArray = user.name.split(" ");
    // const name = nameArray[0];
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to={`/profile/${user.id}`} className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.onLogoutClick.bind(this)} className="nav-link">
              Logout
          </Link>
        </li>
      </ul>
    );

    
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light btn-light sticky-top">
        <div className="container">
          <Link className="navbar-brand logo" to="/">
            <img src={logo} alt="logo"/>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"/>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav"> 
            <ul className="navbar-nav mr-auto">
              <li className="nav-item nav-link">
                {isAuthenticated ? authLinks : guestLinks}
              </li>
            </ul>
            <ul className="navbar-nav text-right">


              <li className="nav-item text-left" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link" to="/contact-us">
                  Contact 
                </Link>
              </li>
              <li className="nav-item text-left" data-toggle="collapse" data-target=".navbar-collapse.show">
                <Link className="nav-link" to="/howItWorks">
                  How it works
                </Link>
              </li>

              <li className="btn btn-primary text-left" data-toggle="collapse" data-target=".navbar-collapse.show"  onClick={this.togglePopup.bind(this)}>
                  {' '}
                    Create a post
              </li>
              <li className="nav-item nav-link row text-center">
                {
                    this.state.showPopup ? 
                      <Popup
                      title='POST AS'
                      text='Post as a member is recommend'
                      closePopup={this.togglePopup.bind(this)}
                      />
                      : null
                }
              </li>
            </ul>
           
          </div>
          
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, {logoutUser})(Navbar));

