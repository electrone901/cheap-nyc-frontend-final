const initialState = {
    like: {}
}

export default function(state= initialState, action) {
    switch(action.type) {
        case 'ADD_LIKE':
        return{
            ...state, 
            like: action.payload
        }
        default:
            return state;
    }
}
