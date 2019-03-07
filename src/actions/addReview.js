import axios from '../axios-stocks';
import { GET_ERRORS } from './types';


//         const formData = new FormData();
//                     //    https://cnycserver.herokuapp.com/items/:itemId/reviews
//         let urlBase = "https://cnycserver.herokuapp.com/items/";
//         

export const postReview = (reviewData, history) => {
    let itemId = this.props.match.params.id;
    axios.post('/items/' + itemId + '/reviews', reviewData)
    .then(res => history.push('/'))
    .catch(err => 
        dispatchEvent({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}