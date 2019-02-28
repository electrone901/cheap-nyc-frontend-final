import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FilterDeals from './FilterDeals';
import AllDeals from './AllDeals';
import stockImage from '../../img/stocks.png';

class Deals extends Component{
  render(){
      
      return(
          <div className="container">
              <FilterDeals />
              <AllDeals />
          </div>
      );
  }
}
export default (Deals);