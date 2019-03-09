import axios from '../axios-stocks';
import { GET_ERRORS, POST_DEAL } from './types';


//         const formData = new FormData();
//                     //    https://cnycserver.herokuapp.com/items/:itemId/reviews
//         let urlBase = "https://cnycserver.herokuapp.com/items/";
//         

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

