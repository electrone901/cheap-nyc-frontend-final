import { combineReducers } from 'redux';
import addReviewReducer from './addReviewReducer';
import addPostDealReducer from './addPostDealReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import transactionReducer from './transactionReducer';
import stockReducer from './stockReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    postDeal: addPostDealReducer,
    addReview: addReviewReducer,
    transactions: transactionReducer,
    stocks: stockReducer
});