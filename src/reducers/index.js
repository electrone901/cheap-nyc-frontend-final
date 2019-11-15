import { combineReducers } from 'redux';
import addReviewReducer from './addReviewReducer';
import addPostDealReducer from './addPostDealReducer';
import addLikeReducer from './addLikeReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    postDeal: addPostDealReducer,
    addReview: addReviewReducer,
    addLike: addLikeReducer,
    user: userReducer
});