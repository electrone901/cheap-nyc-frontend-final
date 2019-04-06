const initialState = {
    review: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'POST_DEAL':
        return{
            ...state,
            review: action.payload
        }
        default:
        return state;
    }
}