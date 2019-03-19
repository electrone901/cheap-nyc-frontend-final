import axios from '../axios-stocks';
import { GET_ERRORS, ADD_LIKE } from './types';

export const addLike = (itemId, history) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    axios.put(`/items/${itemId}/like`, { 
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
            }
    })
    .then(res => {
        dispatch({
            type: ADD_LIKE,
            payload: res.data
        })
      }  
    )
    // .then(res => history.push('/'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      }
    );
}
