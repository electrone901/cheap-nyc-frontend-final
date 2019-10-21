import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
let reduxTools = compose(applyMiddleware(...middleware));

if(process.env.NODE_ENV === 'production'){
    reduxTools = compose(applyMiddleware(...middleware));
}

const store = createStore(
    rootReducer,
    initialState,
    reduxTools
);

export default store;
