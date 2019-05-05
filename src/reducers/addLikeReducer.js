const initialState = {
    like: {},
    getLikedDeals: []
}

export default function(state= initialState, action) {
    switch(action.type) {
        case 'ADD_LIKE':
        return{
            ...state, 
            like: action.payload
        }
        case 'GETLIKEDDEALS':
        return{
            ...state,
            getLikedDeals: action.payload
        }
        default:
            return state;
    }
}

