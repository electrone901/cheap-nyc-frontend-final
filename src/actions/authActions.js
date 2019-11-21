import jwt_decode from 'jwt-decode';
import axios from '../axios-stocks';
import setAuthToken from '../utilis/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, GET_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/users/signup', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      
      history.push(`/profile/${decoded.id}`);
    })
    .catch(err =>
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
    );
};

export const loginUser = (userData) => dispatch => {
  axios.post('/users/login', userData)
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

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if(history){
    history.push('/');
  }
};

export const getUser = (userId) => dispatch => {
    const graphqlQuery = {
          query: `
              query{
                userById(id:"${userId}"){
                  _id
                  name
                  point
                  image
                  title
                  listOfPosts {
                    id
                    name
                  }
                }
              }
          `
      };
        
      fetch('https://cnycserver.herokuapp.com/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(graphqlQuery)
      })
      .then(res => {
          return res.json();
      })
      .then(resData =>{
          if(resData.errors){
              return console.log(resData.errors);
          }
          dispatch({
              type: GET_USER,
              payload: resData.data.userById
          });
      })
      .catch(err => {
          console.log(err);
      });
};

export const removeUserDeal = (userId, postId) => dispatch => {
  axios.put(`/users/${userId}/removeDeal/${postId}`)
    .then(data => {
      dispatch({
          type: GET_USER,
          payload: data.data.user
      });
    })
    .catch(err => 
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
    );
};