import React, { Component } from 'react';
import { connect } from 'react-redux';

import StocksList from './StocksList';
import Spinner from '../common/Spinner';
import { getStocks } from '../../actions/stockActions';

class Stocks extends Component{
    componentDidMount(){
         this.props.getStocks(this.props.auth.user.id);
    }
    
    render(){
        const {stocks, loading} = this.props.stocks;
        let stockContent;
        
        if(stocks === null || loading){
            stockContent = <Spinner />;
        }
        else{
            stockContent = <StocksList stocks={stocks} />;
        }
        
        return(
            <div>
                <h1>Your Stocks</h1>
                {stockContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    stocks: state.stocks,
    auth: state.auth
});

export default connect(mapStateToProps, {getStocks})(Stocks);