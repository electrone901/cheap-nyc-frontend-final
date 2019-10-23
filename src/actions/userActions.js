import axios from '../axios-stocks';

import {
    GET_ERRORS,
    EDIT_USER,
    GET_USER
} from './types';

export const updateTitle = (userId, formData, history) => dispatch => {
    axios.put(`/users/${userId}/edit`, formData)
        .then(res => {
            if (res.errors) {
                return console.log(res.errors);
            }
            dispatch({
                type: GET_USER,
                payload: res.data.user
            });
            history.push(`/profile/${userId}`);
        })
}

export const changeUserImage = (userId, newData, history) => dispatch => {
    axios.put(`/users/${userId}/edit-image`, newData)
        .then(data => {
            dispatch({
                type: EDIT_USER,
                payload: data.user
            });
            history.push(`/profile/${userId}`);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
