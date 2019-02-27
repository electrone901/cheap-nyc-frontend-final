import React, { Component } from 'react';
import StocksItem from './StocksItem';

class StocksList extends Component{
    render(){
        const {stocks} = this.props;
        
        return stocks.map(stock => <StocksItem key={stock._id} stock={stock} />);
    }
}

export default StocksList;