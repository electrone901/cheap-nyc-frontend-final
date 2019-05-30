import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllDeals from './AllDeals';
import Popup from './Popup';
import { getDeals } from '../../actions/addPostDeal';

import noAvailable from '../../img/noAvailable.png';


class AllDealsWithFilter extends Component{
  constructor() {
    super();
    this.state = {
      data: "",
      price1: -1,
      price2: -1,
      category: "",
      showResetBtn: false,
      city: "",
      page: 1,
      totalDeals: 0,
      currentPage: 0
    };
    this.loadPage = this.loadPage.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  togglePopup() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/addDeal');
    }
    else {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
  }

  getAllDeals(e) {
    e.preventDefault();
    this.setState({showResetBtn:false})
    let url = "https://cnycserver.herokuapp.com/items";
    fetch(url)
    .then(res => {
        console.log('res YASS', res);
        return res.json();
    })
    .then((data) => {
        this.setState({data: data.items});
    })
    .catch((err) => {
        console.log('There was a problem with your fetch request' + err.message);
    });
  }
  
  findDeals(e) {
    e.preventDefault();
    let {category, city, price1, price2} = this.state; 
    // get all items in DB
    if(category === "" && city === "" &&  price1 === -1 && price2 === -1) {
      let url = "https://cnycserver.herokuapp.com/items";
      fetch(url)
      .then(res => {
          return res.json();
      })
      .then((data) => {
          this.setState({data: data.items});
      })
      .catch((err) => {
          console.log('There was a problem with your fetch request' + err.message);
      });
    }
    else {
      const graphqlQuery = {
        query: `{
          itemsByFilter(
            category: "${category}", 
            city: "${city}", 
            price1: ${price1}, price2: ${price2}) {
              _id
              name
              price
              city 
              image
              likes
          }
        }`
      };
  
      fetch('https://cnycserver.herokuapp.com/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(graphqlQuery)
      })
      .then(res => {
          return res.json();
      })
      .then(resData =>{
          if(resData.errors){
              return console.log('from API',resData.errors);
          }
          else {
            console.log('luis data',resData.data.itemsByFilter)
            this.setState({ data: resData.data.itemsByFilter})
          }
      })
      .catch(err => {
          console.log('from API',err);
      });  
    }

    // show/hide showResetBtn
    if(category !== "" || city !== "" ||  price1 !== -1 || price2 !== -1) {
      this.setState({showResetBtn: true})
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
    let url = "https://cnycserver.herokuapp.com/items";
    // this.props.getDeals(url);
    fetch(url)
    .then(res => {
        console.log('res', res);
        return res.json();
    })
    .then((data) => {
        this.setState({
          data: data.items,
          totalDeals: data.totalDeals,
          currentPage: 1
        });
    })
    .catch((err) => {
        console.log('There was a problem with your fetch request' + err.message);
    });
  }
  
  loadPage(number){
    const {innerWidth:width, innerHeight: height} = window;
    
    window.scrollTo(width, height / 1.6);
    let url = "https://cnycserver.herokuapp.com/items?page=" + number;
    fetch(url)
    .then(res => {
        console.log('res', res);
        return res.json();
    })
    .then((data) => {
        this.setState({
          data: data.items,
          totalDeals: data.totalDeals,
          currentPage: number
        });
    })
    .catch((err) => {
        console.log('There was a problem with your fetch request' + err.message);
    });
  }

  handleChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  handleChangeCity(e) {
    this.setState({
      city: e.target.value
    })
  }

  handleChangePrice(e) {
    let prices = e.target.value.split('&');
    console.log('prices',prices)
    this.setState({
      price1:prices[0],
      price2: prices[1]
    })
  }

  render(){
    return(
        <div>
          <h1 className="title">Explore by category</h1>
          <div className="filterbutton">
            <div className="dropdown col-lg-3 col-md-3 col-sm">
              {
                this.state.showResetBtn ? 
                <button className="resetBtn" onClick={this.getAllDeals.bind(this)}>Reset All</button>: null
              }
            </div>
            <div className="row text-center">
              <div className="dropdown col-lg-3 col-md-3 col-sm">
                <select
                  value={this.state.selectValue}
                  onChange={this.handleChangeCategory}
                  className="btn btn-light dropdown-toggle btn-width btn-height"
                >
                  <option value="">All categories</option>
                  <option value="Food">Food</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Activities">Activities</option>
                  <option value="Events">Events</option>
                  <option value="Arts">Arts</option>
                  <option value="Sports">Sports</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Music">Music</option>
                  <option value="Classes">Classes</option>
                  <option value="Travel">Travel</option>
                  <option value="Social">Social</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="dropdown col-lg-3 col-md-3 col-sm">
                <select
                  value={this.state.selectValue}
                  onChange={this.handleChangeCity}
                  className="btn btn-light dropdown-toggle btn-width btn-height"
                > 
                  <option value="">All Cities</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Queens">Queens</option>
                  <option value="Bronx">Bronx</option>
                  <option value="Brooklyn">Brooklyn</option>
                  <option value="Staten Island">Staten Island</option>
                </select>
              </div>

              <div className="dropdown col-lg-3 col-md-3 col-sm">
                <select
                  value={this.state.value}
                  onChange={this.handleChangePrice}
                  className="btn btn-light dropdown-toggle btn-width btn-height"
                >
                  <option value="-1&-1">All Prices</option>
                  <option value="0&0">Free</option>
                  <option value="0&1">under $ 1</option>
                  <option value="1&5">under $ 5</option>
                  <option value="5&10">under $ 10</option>
                  <option value="10&20">under $ 20</option>
                  <option value="20&30">under $ 30</option>
                </select>
              </div>

              <div className="dropdown col-lg-3 col-md-3 col-sm">
                <button className="btn btn-primary btn-width" onClick={this.findDeals.bind(this)}>Find Deals</button>
              </div>
            </div>
          </div>

          <div>
            <AllDeals data={this.state.data} />
            <div className="d-flex justify-content-center my-2">
              {(() => {
                const rows = [];
                for (let i = 1; i <= (this.state.totalDeals / 8) + 1; i++) {
                  rows.push(
                    <button
                      key={i}
                      className= {this.state.currentPage === i ? "btn btn-primary mx-3" : "btn mx-3"}
                      onClick={this.loadPage.bind(this, i)}>
                      {i}
                    </button>
                  );
                }
                return rows;
              })()}
            </div>
          </div>

        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  postDeal: state.postDeal
});

export default connect(mapStateToProps, {getDeals}) (withRouter(AllDealsWithFilter));
