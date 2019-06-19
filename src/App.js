import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utilis/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './store';

import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Deals from './component/deals/Deals';
import AddDeal from './component/deals/AddDeal';
import EditDeal from './component/deals/EditDeal';

import howItWorks from './component/how_it_works&credits/how_it_works&credits';
import Membership from './component/how_it_works&credits/Membership';
import Feedback from './component/how_it_works&credits/Feedback';
import Contact from './component/how_it_works&credits/Contact';
import Deal from './component/deals/Deal';
import AddReview from './component/review/AddReview';
import AddReviewAsGuest from './component/review/AddReviewAsGuest';
import UserProfile from './component/user/UserProfile';
import EditUserProfile from './component/user/EditUserProfile';

import Register from './component/auth/Register';
import RegisterWithEmail from './component/auth/RegisterWithEmail';
import Login from './component/auth/Login';

import NotFound from './component/error/NotFound';
import NoDealFound from './component/error/NoDealFound';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/" component={Deals} />
                <Route exact path="/addDeal" component={AddDeal} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/:id" component={UserProfile} />
                <Route exact path="/user/:id" component={UserProfile} />
                <Route exact path="/profile/:id/edit" component={EditUserProfile} />
                <Route exact path="/addReview/:id" component={AddReview} />
                <Route exact path="/addReview-guest/:id" component={AddReviewAsGuest} />
                <Route exact path="/howItWorks" component={howItWorks} />
                <Route exact path="/membership" component={Membership} />
                <Route exact path="/contact-us" component={Contact} />
                <Route exact path="/feedback" component={Feedback} />
                <Route exact path="/deal/:id" component={Deal} />
                <Route exact path="/deal/:id/edit" component={EditDeal} />
                <Route exact path="/nodealfound" component={NoDealFound} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
