import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FilterDeals extends Component{
  render(){
      return(
          <div className="">
            <h1>NY Best Deals - Las Mejores ofertas</h1>
            <div className="filterbutton">
              <div className="row">
                <div className="dropdown col-sm">
                  <button className="btn btn-secondary dropdown-toggle btn-width" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Category
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className="dropdown col-sm">
                  <button className="btn btn-secondary dropdown-toggle btn-width" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Area
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className="col-xl"> 
                  <Link to="/addDeal" className="btn btn-primary btn-width">Add Deal</Link>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FilterDeals);
