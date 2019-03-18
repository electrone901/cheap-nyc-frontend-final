import axios from '../axios-stocks';
import { GET_ERRORS, POST_REVIEW } from './types';

export const postReview = (reviewData, itemId, history) => dispatch => {
    console.log('action postReview actions', reviewData, itemId, history)
    axios.post('/items/' + itemId + '/reviews', reviewData)
    .then(res => {
        dispatch({
            type: POST_REVIEW,
            payload: res.data
        })
    })
    .then(res => {
        history.push(`/deal/${itemId}`);
    }) 
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}
