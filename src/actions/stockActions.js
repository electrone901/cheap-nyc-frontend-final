import axios from '../axios-stocks';

import { GET_STOCKS, STOCK_LOADING } from './types';

export const getStocks = (id) => dispatch => {
    dispatch(setStockLoading());
    axios.get(`/api/stocks/all/${id}`)
        .then(res =>
            dispatch({
                type: GET_STOCKS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_STOCKS,
                payload: {}
            })
        );
};

export const setStockLoading = () => {
    return{
        type: STOCK_LOADING
    };
};