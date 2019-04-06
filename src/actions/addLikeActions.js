import axios from '../axios-stocks';
import { GET_ERRORS, GET_DEAL } from './types';

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
            type: GET_DEAL,
            payload: res.data.item
        });
      }  
    )
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
      }
    );
}
