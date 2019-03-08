import isEmpty from '../validation/is-empty';

const initialState = {
    post: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'POST_DEAL':
        return{
            ...state,
            post: action.payload
        }
        default:
        return state;
    }
}