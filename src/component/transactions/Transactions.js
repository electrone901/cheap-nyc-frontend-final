import React, { Component } from 'react';
import { connect } from 'react-redux';

import TransactionsList from './TransactionsList';
import Spinner from '../common/Spinner';
import { getTransactions } from '../../actions/transactionActions';

class Transactions extends Component{
    componentDidMount(){
         this.props.getTransactions(this.props.auth.user.id);
    }
    
    render(){
        const {transactions, loading} = this.props.transactions;
        let transactionContent;
        
        if(transactions === null || loading){
            transactionContent = <Spinner />;
        }
        else{
            transactionContent = <TransactionsList transactions={transactions} />;
        }
        
        return(
            <div>
                <h1>Your Transactions</h1>
                {transactionContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions,
    auth: state.auth
});

export default connect(mapStateToProps, {getTransactions})(Transactions);