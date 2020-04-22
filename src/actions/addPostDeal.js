import axios from '../axios-stocks';
import {
    GET_ERRORS,
    POST_DEAL,
    GET_DEAL,
    GET_DEALS,
    SET_DEALLOADING,
    REMOVE_DEALLOADING
} from './types';

export const postDeal = (postData, history) => dispatch => {
    dispatch(setDealLoading());

    axios.post('/items/', postData)
        .then(res => {
            dispatch({
                type: POST_DEAL,
                payload: res.data
            });
            dispatch(removeDealLoading());
        })
        .then(() => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });

            dispatch(removeDealLoading());
        });
};

export const editItemDeal = (postData, itemId, history) => dispatch => {
    axios.put(`/items/${itemId}`, postData)
        .then(res => history.push(`/deal/${itemId}`))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const removeADeal = (itemId, history) => dispatch => {
    axios.delete(`/items/${itemId}`, itemId)
        .then(res => history.push('/'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getDeal = (url, history) => dispatch => {
    fetch(url)
        .then(res => {
            if (res.status === 404) {
                return history.push('/nodealfound');
            }
            return res.json();
        })
        .then(data => {

            dispatch({
                type: GET_DEAL,
                payload: data.item
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};

export const getDeals = (url) => dispatch => {
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            dispatch({
                type: GET_DEALS,
                payload: data.items
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};

export const getFilteredDeals = (url) => dispatch => {
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            dispatch({
                type: GET_DEALS,
                payload: data.items
            });
        })
        .catch((err) => {
            console.log('There was a problem with your fetch request' + err.message);
        });
};

const setDealLoading = () => {
    return{
        type: SET_DEALLOADING
    }
}

const removeDealLoading = () => {
    return{
        type: REMOVE_DEALLOADING
    }
}