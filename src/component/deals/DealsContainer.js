import React, {Component} from 'react';
import AllDealsWithFilter from './AllDealsWithFilter';
import Slider from '../carousel/Slider';

class DealsContainer extends Component{
  
  render(){
    return(
        <div>
          <Slider />
          <div className="container">
              <AllDealsWithFilter />
          </div>
        </div>
    );
  }
}
export default DealsContainer;