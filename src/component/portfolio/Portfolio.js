import React, { Component } from 'react';
import request from 'request-promise';
import { connect } from 'react-redux';
import { withRouter   } from 'react-router-dom';

import { logoutUser, getUser, loseMoney } from '../../actions/authActions';
import { addTransaction } from '../../actions/transactionActions';

class Portfolio extends Component{
    constructor(){
        super();
        this.state = {
            stocks: [],
            name: '',
            error: '',
            quantity: 1,
            show: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        this.props.getUser(this.props.auth.user.id);
    }
     
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
        
        var options = {
            uri: `https://api.iextrading.com/1.0/tops?symbols=`+this.state.name,
            json: true
        };
        
        request(options)
            .then((response) => {
                console.log(response);
                if(response.length > 0){
                    this.setState({show: true});
                    this.setState({error: ""});
                    this.setState({stocks: response});
                }
                else{
                    this.setState({error: "Not found"});
                    this.setState({show: false});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    buyStock(symbol, price, quantity){
        let totalPrice = price * quantity;
        const moneyData = {
            money: totalPrice
        };
        
        const stockData = {
            symbol: symbol,
            price: totalPrice,
            quantity: quantity
        };
        
        this.props.loseMoney(moneyData, this.props.auth.user.id);
        this.props.addTransaction(stockData, this.props.history);
    }
     
    render(){
        const {userMoney} = this.props.auth;
        let stockInfo;
        
        stockInfo = (
            <div className="border border-primary mt-3">
                {
                    this.state.stocks.map((stock, index) => {
                      return (
                        <div key={index}>
                            <p>Symbol: {stock.symbol}</p>
                            <p>Price: ${stock.lastSalePrice.toFixed(2)}</p>
                            <p>Volume: {stock.volume}</p>
                            <input
                              type="Number"
                              value={this.state.quantity}
                              name="quantity"
                              onChange={this.onChange}
                            />
                            <button
                                onClick={() => this.buyStock(stock.symbol, stock.lastSalePrice, this.state.quantity)}>
                                Buy
                            </button>
                        </div>
                      );
                    })
                }
                
            </div>
        );
        
        return(
            <div className="Portfolio">
                <h1 className="text-center">Portfolio</h1>
                <p className="text-center">You have ${userMoney.money.toFixed(2)}</p>
                <form onSubmit={this.onSubmit}>
                    <input
                      type="text"
                      placeholder="Stock Name"
                      name="name"
                      onChange={this.onChange}
                    />
                    <input type="submit" />
                </form>
                {this.state.show ? stockInfo : null}
                <p>{this.state.error}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, getUser, loseMoney, addTransaction})(withRouter(Portfolio));