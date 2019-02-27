import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import transactionReducer from './transactionReducer';
import stockReducer from './stockReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    transactions: transactionReducer,
    stocks: stockReducer
});