import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    userMoney: {}
};

export default function(state = initialState, action){
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                userMoney: action.payload
            };
        case 'GET_USER':
            return{
                ...state,
                userMoney: action.payload
            };
        default:
            return state;
    }
}