import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllDeals from './AllDeals';
import Popup from './Popup';
import { getDeals } from '../../actions/addPostDeal';


class AllDealsWithFilter extends Component{
  constructor() {
    super();
    this.state = {
      data: '',
      price1: null,
      price2: null,
      category: null,
      city: null
    };
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
  
  findDeals(e) {
    e.preventDefault();
    let {category, city, price1, price2} = this.state;

    console.log('all ', category, city, price1, price2)
    

    if((category === null && city === null &&  price1 === null && price2 === null) || 
    (category === "" && city === "" &&  price1 === ""  && price2 === undefined)) {
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
  
            // this.setState({data: data.items});
          }
          // dispatch({
          //     type: GET_USER,
          //     payload: resData.data.userById
          // });
      })
      .catch(err => {
          console.log('from API',err);
      });  
    }
  }

  componentDidMount() {
    let url = "https://cnycserver.herokuapp.com/items";
    // this.props.getDeals(url);
    
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
    this.setState({
      category: e.target.value
    })
    // let url;
    // let category = e.target.value;
    // if(category === 'All categories') {
    //   url = 'https://cnycserver.herokuapp.com/items'
    // }
    // else {
    //   url = `https://cnycserver.herokuapp.com/items?type=category&categoryName=`+category;
    // }
    // fetch(url)
    // .then(res => {
    //   return res.json();
    // })
    // .then((data) => {
    //   this.setState({data: data.items});
    // })
    // .catch((err) => {
    //   console.log('There was a problem with your fetch request')
    // });
  }

  handleChangeCity(e) {
    // let url;
    // let city = e.target.value;
    this.setState({
      city: e.target.value
    })

    // if(city === 'All Cities') {
    //   url = 'https://cnycserver.herokuapp.com/items';
    // }
    // else {
    //   url = `https://cnycserver.herokuapp.com/items?type=city&cityName=`+city;
    // }
    // fetch(url)
    // .then(res => {
    //   return res.json()
    // })
    // .then((data) => {
    //   this.setState({data: data.items});
    // })
    // .catch((err) => {
    //   console.log('There was a problem with your fetch request')
    // })
  }




  handleChangePrice(e) {
    let prices = e.target.value.split('&');
    console.log('prices',prices)
    this.setState({
      price1:prices[0],
      price2: prices[1]
    })

    



    // let url;
    // let price = e.target.value;
    // if(price === 'All Prices') {
    //   url = 'https://cnycserver.herokuapp.com/items';
    // }
    // else {
             
    //   url = `https://cnycserver.herokuapp.com/items?type=price&`+ price;
    // }
    // fetch(url)
    // .then(res => {
    //   return res.json()
    // })
    // .then((data) => {
    //   this.setState({data: data.items});
    // })
    // .catch((err) => {
    //   console.log('There was a problem with your fetch request')
    // })

    
  }
  render(){
    // console.log('state',this.state)
    console.log('props',this.props.postDeal.post)
      return(
          <div>
            <h1 className="title">Explore by category</h1>

            {/* ADDING GROUP FILTER */}
            {/* <div className="filterbutton">
              <div className="row text-center">

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <select
                    value={this.state.selectValue}
                    onChange={this.handleChangeCategory}
                    disabled={this.state.filterByCategory === true ? true : null}
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
                  <button className="btn btn-primary btn-width" onClick={this.findDeals.bind(this)}>Find Deals</button>
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
             */}
            {/* ADDING GROUP FILTER */}

            
            <div className="filterbutton">
              <div className="row text-center">

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
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

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
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

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <select
                    value={this.state.value}
                    onChange={this.handleChangePrice}
                    className="btn btn-light dropdown-toggle btn-width btn-height"
                  >
                    <option value="">All Prices</option>
                    <option value="0&0">Free</option>
                    <option value="0&1">under $ 1</option>
                    <option value="1&5">under $ 5</option>
                    <option value="5&10">under $ 10</option>
                    <option value="10&20">under $ 20</option>
                    <option value="20&30">under $ 30</option>
                    <option value="30&50">under $ 50</option>
                    <option value="50&1000">over $ 50</option>
                  </select>
                </div>

                <div className="dropdown col-lg-3 col-md-3 col-sm-6">
                  <button className="btn btn-primary btn-width" onClick={this.findDeals.bind(this)}>Find Deals</button>
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
              {/* <AllDeals data={this.props.postDeal.post} /> */}
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
