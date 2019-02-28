import React, {Component} from 'react';

import FilterDeals from './FilterDeals';
import AllDeals from './AllDeals';

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