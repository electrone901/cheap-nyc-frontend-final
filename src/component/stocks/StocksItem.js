import React, { Component } from 'react';
import request from 'request-promise';
import classnames from 'classnames';
import { connect } from 'react-redux';

class StocksItem extends Component{
    constructor(){
        super();
        this.state = {
            price: 0
        };
    }
    
    componentDidMount(){
        const options = {
            uri: `https://api.iextrading.com/1.0/stock/${this.props.stock.symbol}/price`,
            json: true
        };
        
        request(options)
            .then((response) => {
                this.setState({price: response});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    render(){
        const {stock} = this.props;
        
        const pps = stock.price/stock.quantity;
        
        const changePrecent = ((pps/this.state.price) * 100);
        
        return(
            <div className={classnames("card card text-dark mb-1 p-2",
                {'bg-success': (pps) > this.state.price,'bg-danger': (pps) < this.state.price}
            )}>
                <div className="row">
                    <div className="col-md-2">
                        <h5 className="d-inline">{stock.symbol}</h5>
                    </div>
                    <div className="col-md-2">
                        <p className="d-inline">Stocks - {stock.quantity}</p>
                    </div>
                    <div className="col-md-3">
                        <p className="d-inline">PPS - ${pps.toFixed(2)}</p>
                    </div>
                    <div className="col-md-3">
                        <p className="d-inline">MP - ${this.state.price}</p>
                    </div>
                    <div className="col-md-2">
                        <p className="d-inline">
                            {changePrecent > 100 ? <i class="fas fa-level-up-alt"></i> : null}
                            {changePrecent < 100 ? <i class="fas fa-level-down-alt"></i> : null}
                            {changePrecent.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(StocksItem);