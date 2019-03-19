const initialState = {
    post: []
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
        default:
            return state;
    }
}