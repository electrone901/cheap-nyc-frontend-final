const initialState = {
    flag: {}
}

export default function(state= initialState, action) {
    switch(action.type) {
        case 'ADD_FLAG':
        return{
            ...state, 
            like: action.payload
        }
        default:
            return state;
    }
}
