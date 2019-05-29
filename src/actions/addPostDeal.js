import axios from '../axios-stocks';
import { GET_ERRORS, POST_DEAL, GET_DEAL, GET_DEALS } from './types';

export const postDeal = (postData, history) => dispatch => {
    axios.post('/items/', postData)
    .then(res => {
        dispatch({
            type: POST_DEAL,
            payload: res.data
        });
      }  
    )
    .then(res => history.push('/'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
      }
    );
};

export const editItemDeal = (postData, itemId,  history) => dispatch => {
    axios.put(`/items/${itemId}`, postData)
        .then(res => history.push(`/deal/${itemId}`))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
          }
    );
};

export const getDeal = (url) => dispatch => {
    fetch(url)
        .then(res => {
            console.log('res', res);
            return res.json();
        })
        .then(data => {
            dispatch({
                type: GET_DEAL,
                payload:  data.item
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};

export const getDeals = (url) => dispatch => {
    console.log('getDeals  ****')
    fetch(url)
        .then(res => {
            console.log('res Luis', res);
            return res.json();
        })
        .then(data => {
            dispatch({
                type: GET_DEALS,
                payload:  data.items
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};

export const getFilteredDeals = (url) => dispatch => {
    console.log('getDeals  ****')
    fetch(url)
        .then(res => {
            console.log('res Luis', res);
            return res.json();
        })
        .then(data => {
            dispatch({
                type: GET_DEALS,
                payload:  data.items
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};