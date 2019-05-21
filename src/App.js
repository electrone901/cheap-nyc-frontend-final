import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utilis/setAuthToken';
import PrivateRoute from './component/common/PrivateRoute';
import { setCurrentUser, logoutUser } from './actions/authActions';

import store from './store';

import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Deals from './component/deals/Deals';
import AddDeal from './component/deals/AddDeal';

import howItWorks from './component/how_it_works&credits/how_it_works&credits';
import ContactUs from './component/how_it_works&credits/ContactUs';

import PreviewConfirmationPost from './component/deals/PreviewConfirmationPost';
import Deal from './component/deals/Deal';
import AddDealAsGuest from './component/deals/AddDealAsGuest';
import AddReview from './component/review/AddReview';
import AddReviewAsGuest from './component/review/AddReviewAsGuest';
import UserProfile from './component/user/UserProfile';
import EditUserProfile from './component/user/EditUserProfile';

import Register from './component/auth/Register';
import Login from './component/auth/Login';

import NotFound from './component/error/NotFound';


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
                <Route exact path="/confirmation-post" component={PreviewConfirmationPost} />
                <Route exact path="/AddDeal-guest" component={AddDealAsGuest} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile/:id" component={UserProfile} />
                <Route exact path="/user/:id" component={UserProfile} />
                <Route exact path="/profile/:id/edit" component={EditUserProfile} />
                <Route exact path="/addReview/:id" component={AddReview} />
                <Route exact path="/addReview-guest/:id" component={AddReviewAsGuest} />
                <Route exact path="/howItWorks" component={howItWorks} />
                <Route exact path="/contact-us" component={ContactUs} />
                <Route exact path="/deal/:id" component={Deal} />
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
