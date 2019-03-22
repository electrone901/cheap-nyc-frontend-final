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
import PreviewConfirmationPost from './component/deals/PreviewConfirmationPost';
import Deal from './component/deals/Deal';
import AddDealAsGuest from './component/deals/AddDealAsGuest';
import AddReview from './component/review/AddReview';
import AddReviewAsGuest from './component/review/AddReviewAsGuest';
import UserProfile from './component/user/UserProfile';

import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Portfolio from './component/portfolio/Portfolio';
import Transactions from './component/transactions/Transactions';
import Stocks from './component/stocks/Stocks';

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
              <Route exact path="/" component={Deals} />
              <Route exact path="/addDeal" component={AddDeal} />
              <Route exact path="/confirmation-post" component={PreviewConfirmationPost} />
              <Route exact path="/AddDeal-guest" component={AddDealAsGuest} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={UserProfile} />
              <Route exact path="/addReview/:id" component={AddReview} />
              <Route exact path="/addReview-guest/:id" component={AddReviewAsGuest} />
              
              <Switch>
                 <PrivateRoute exact path="/portfolio" component={Portfolio} />
                 <Route exact path="/deal/:id" component={Deal} />
                 <PrivateRoute exact path="/transactions" component={Transactions} />
                 <PrivateRoute exact path="/stocks" component={Stocks} />
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
