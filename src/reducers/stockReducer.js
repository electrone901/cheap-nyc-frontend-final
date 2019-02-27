const initialState = {
    stocks: null,
    loading: false
};

export default function(state = initialState, action){
    switch (action.type) {
        case 'STOCK_LOADING':
            return{
                ...state,
                loading: true
            };
        case 'GET_STOCKS':
            return{
                ...state,
                stocks: action.payload,
                loading: false
            };
        default:
            return state;
    }
}