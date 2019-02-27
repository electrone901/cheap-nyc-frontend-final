const initialState = {
    transactions: null,
    loading: false
};

export default function(state = initialState, action){
    switch (action.type) {
        case 'TRANSACTION_LOADING':
            return{
                ...state,
                loading: true
            };
        case 'GET_TRANSACTIONS':
            return{
                ...state,
                transactions: action.payload,
                loading: false
            };
        default:
            return state;
    }
}