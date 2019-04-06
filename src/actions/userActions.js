import axios from '../axios-stocks';

import { GET_ERRORS, EDIT_USER } from './types';

export const editUser = (userId, newData, history) => dispatch => {
    axios.put(`/users/${userId}/edit`, newData)
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