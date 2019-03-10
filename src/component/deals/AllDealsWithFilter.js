import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import AllDeals from './AllDeals';

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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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
          <div>
            <h1 className="title">Explore by category</h1>
            <div className="filterbutton">
              <div className="row text-center">

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleChangeCategory}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
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

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleChangeCity}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
                  > 
                    <option value="All Cities">All Cities</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="Queens">Queens</option>
                    <option value="Bronx">Bronx</option>
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Staten Island">Staten Island</option>
                  </select>
                </div>

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <select
                    value={this.state.value}
                    onChange={this.handleChangePrice}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
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

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <button className="btn btn-primary btn-width" onClick={this.togglePopup.bind(this)}>Add Deal</button>
                </div>


                <div className='container'>
                  {
                    this.state.showPopup ? 
                      <Popup
                      title='POST AS'
                      text='Post as a member is recommend'
                      closePopup={this.togglePopup.bind(this)}
                      />
                      : null
                  }
                </div>
              </div>
            </div>

            <div>
              <AllDeals data={this.state.data} />
            </div>

          </div>
      );
  }
}

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="padding-top">{this.props.title}</h1>
            <p className="small">{this.props.text}</p>
            
            <div className="row text-center">
              <div className="col-lg-6 col-md-6 col-sm-4 padding-top">
                <Link to="/addDeal" className="btn btn-primary btn-width">As Member <i className="fa fa-check" aria-hidden="true"></i></Link>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-4 padding-top">
                <Link to="/addDeal-guest" className="btn btn-primary btn-width">As Guest</Link>
              </div>
            </div>
            <div className="padding-top">
              <button className="btn-info-helpful" onClick={this.props.closePopup}>Close me</button>
            </div>
          </div>
        </div>
      );
    }
  }

export default AllDealsWithFilter;
