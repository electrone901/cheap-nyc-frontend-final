import jwt_decode from 'jwt-decode';

import axios from '../axios-stocks';
import setAuthToken from '../utilis/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, GET_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      );
};

export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const getUser = (id) => dispatch => {
    axios.get(`/api/users/${id}`)
        .then(res =>
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_USER,
                payload: null
            })
        );
};

export const loseMoney = (moneyData, id) => dispatch => {
    axios
        .post(`/api/users/buy/${id}`, moneyData)
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};