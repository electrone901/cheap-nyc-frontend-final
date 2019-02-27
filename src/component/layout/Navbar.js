import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e){
      e.preventDefault();
      this.props.logoutUser();
  }
  
  render() {
    const {isAuthenticated, user} = this.props.auth;
    
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
              Welcome, {user.name}
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
        <Link className="navbar-brand" to="/categories">
          Creat a post
        </Link>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li> */}
      </ul>
    );
    
    const authLinks2 = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/portfolio">
            {' '}
            Portfolio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/transactions">
            {' '}
            Transaction
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/stocks">
            {' '}
            Stock
          </Link>
        </li>
      </ul>
    );
    
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Cheap NY
          </Link>
          <Link className="navbar-brand" to="/">
            Deals
          </Link>
          <Link className="navbar-brand" to="/categories">
            Categories
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks2 : null}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);