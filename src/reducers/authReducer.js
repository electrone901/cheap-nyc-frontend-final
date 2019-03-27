import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    userData: {}
};

export default function(state = initialState, action){
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case 'GET_USER':
            return{
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
}