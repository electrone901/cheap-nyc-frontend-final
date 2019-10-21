import axios from '../axios-stocks';
import { POST_REPORT, GET_ERRORS } from './types';
export const postReport = (reportData, itemId) => dispatch => {
    
    axios.post('/items/'+ itemId + "/report", reportData) 
    .then(res => {
        dispatch({
            type: POST_REPORT,
            payload: res.data
        })
        }
    )
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}