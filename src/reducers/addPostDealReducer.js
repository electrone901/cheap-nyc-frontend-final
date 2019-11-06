const initialState = {
    post: [],
    postLoading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'POST_DEAL':
            return{
                ...state,
                post: action.payload
            };
        case 'GET_DEAL':
            return{
                ...state,
                post: action.payload
            };
        case 'GET_DEALS':
            return{
                ...state,
                post: action.payload
            };
        case 'SET_DEALLOADING':
            return{
                ...state,
                postLoading: true
            };
        case 'REMOVE_DEALLOADING':
            return{
                ...state,
                postLoading: false
            }
        default:
            return state;
    }
}