import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

class TransactionsItem extends Component{
    render(){
        const {transaction} = this.props;
        
        return(
            <div className="card card bg-light text-dark mb-1 p-2">
                <div className="row">
                    <div className="col-md-3">
                        <h5 className="d-inline">{transaction.symbol}</h5>
                    </div>
                    <div className="col-md-3">
                        <p className="d-inline">${transaction.price.toFixed(2)}</p>
                    </div>
                    <div className="col-md-3">
                        <p className="d-inline">{transaction.quantity}</p>
                    </div>
                    <div className="col-md-3">
                        <p className="d-inline"><Moment format="MM/DD/YYYY">{transaction.date}</Moment></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(TransactionsItem);