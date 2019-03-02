import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import AllDealsTry from './AllDeals';

class AllDealsWithFilter extends Component{
  constructor() {
    super();
    this.state = {
      data: ''
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }
  componentDidMount() {
    let url = "https://cnycserver.herokuapp.com/items";
    fetch(url)
    .then(res => {
        console.log('res', res);
        return res.json();
    })
    .then((data) => {
        this.setState({data: data.items});
    })
    .catch((err) => {
        console.log('There was a problem with your fetch request' + err.message);
    });
}

  handleChangeCategory(e) {
    let url;
    let category = e.target.value;
    if(category === 'All categories') {
      url = 'https://cnycserver.herokuapp.com/items'
    }
    else {
      url = `https://cnycserver.herokuapp.com/items?type=category&categoryName=`+category;
    }
    console.log('url', url);
    fetch(url)
    .then(res => {
      return res.json();
    })
    .then((data) => {
      this.setState({data: data.items});
    })
    .catch((err) => {
      console.log('There was a problem with your fetch request')
    });
  }

  handleChangeCity(e) {
    console.log('city', e.target.value);
    let url;
    let city = e.target.value;
    if(city === 'All Cities') {
      url = 'https://cnycserver.herokuapp.com/items';
    }
    else {
      url = `https://cnycserver.herokuapp.com/items?type=city&cityName=`+city;
    }
    console.log('url',url)
    fetch(url)
    .then(res => {
      return res.json()
    })
    .then((data) => {
      this.setState({data: data.items});
    })
    .catch((err) => {
      console.log('There was a problem with your fetch request')
    })
  }


  handleChangePrice(e) {
    console.log('price', e.target.value);
    let url;
    let price = e.target.value;
    if(price === 'All Prices') {
      url = 'https://cnycserver.herokuapp.com/items';
    }
    else {
             
      url = `https://cnycserver.herokuapp.com/items?type=price&`+ price;
    }
    console.log('url',url)
    fetch(url)
    .then(res => {
      return res.json()
    })
    .then((data) => {
      this.setState({data: data.items});
    })
    .catch((err) => {
      console.log('There was a problem with your fetch request')
    })
  }
  render(){
    console.log('data', this.state.data)
      return(
          <div className="">
            <h1>NY Best Deals - Las Mejores ofertas</h1>
            <div className="filterbutton">
              <div className="row">

                <div className="dropdown col-sm">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleChangeCategory}
                    className="btn btn-secondary dropdown-toggle btn-width btn-height"
                  >
                    <option value="All categories">All categories</option>
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

                <div className="dropdown col-sm">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleChangeCity}
                    className="btn btn-secondary dropdown-toggle btn-width btn-height"
                  > 
                    <option value="All Cities">All Cities</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Queens">Queens</option>
                    <option value="Bronx">Bronx</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Staten Island">Staten Island</option>
                  </select>
                </div>

                <div className="dropdown col-sm">
                  <select
                    value={this.state.value}
                    onChange={this.handleChangePrice}
                    className="btn btn-secondary dropdown-toggle btn-width btn-height"
                  >
                    <option value="All Prices">All Prices</option>
                    <option value="price1=0&price2=0">Free</option>
                    <option value="price1=0&price2=1">under $ 1</option>
                    <option value="price1=1&price2=5">under $ 5</option>
                    <option value="price1=5&price2=10">under $ 10</option>
                    <option value="price1=10&price2=20">under $ 20</option>
                    <option value="price1=20&price2=30">under $ 30</option>
                    <option value="price1=30&price2=50">under $ 50</option>
                    <option value="price1=50&price2=1000">over $ 50</option>
                  </select>
                </div>

                <div className="col-xl"> 
                  <Link to="/addDeal" className="btn btn-primary btn-width">Add Deal</Link>
                </div>

              </div>
            </div>

            <div>
              <AllDealsTry data={this.state.data} />
            </div>


          </div>
      );
  }
}

export default AllDealsWithFilter;
