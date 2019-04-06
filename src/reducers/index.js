import { combineReducers } from 'redux';
import addReviewReducer from './addReviewReducer';
import addFlagReducer from './addFlagReducer';
import addPostDealReducer from './addPostDealReducer';
import addLikeReducer from './addLikeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import transactionReducer from './transactionReducer';
import stockReducer from './stockReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    postDeal: addPostDealReducer,
    addReview: addReviewReducer,
    addLike: addLikeReducer,
    addFlag: addFlagReducer,
    user: userReducer,
    transactions: transactionReducer,
    stocks: stockReducer
});