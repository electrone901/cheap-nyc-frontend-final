import axios from '../axios-stocks';
import { GET_ERRORS, POST_DEAL, GET_DEAL } from './types';

export const postDeal = (postData, history) => dispatch => {
    axios.post('/items/', postData)
    .then(res => {
        dispatch({
            type: POST_DEAL,
            payload: res.data
        })
      }  
    )
    .then(res => history.push('/'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      }
    );
}



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