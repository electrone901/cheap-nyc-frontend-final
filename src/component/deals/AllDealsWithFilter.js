import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllDeals from './AllDeals';
import { getDeals } from '../../actions/addPostDeal';
import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('**initGA');
  ReactGA.initialize('UA-142224072-1');
}
export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

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
      currentPage: 0,
      filerMode: 'category',
      dealName: ''
    };
    this.loadPage = this.loadPage.bind(this);
    this.onChange = this.onChange.bind(this);
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
            this.setState({ 
              data: resData.data.itemsByFilter,
              totalDeals: 0
            });
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
    // this.props.history.listen(location => ReactGA.pageview(location.pathname)); 
    initGA();
    loadPageView();
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
      price1: prices[0],
      price2: prices[1]
    })
  }

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  };

  searchDealByName(){
    let url =  "https://cnycserver.herokuapp.com/items/searchItemByName?name=" + this.state.dealName;
    fetch(url)
      .then(res => {
          return res.json();
      })
      .then(data => {
          this.setState({
            data: data.items
          });
      })
      .catch((err) => {
          console.log('There was a problem with your fetch request' + err.message);
      });
  }

  render(){
    const noDealMesage = (
      <div>
          <h5 className="text-center text-warning">
              No Deal Found
          </h5>
      </div>
    );

    const filterbutton = (
      <div className="filterbutton">
        <div className="dropdown col-lg-3 col-md-3 col-sm">
          {
            this.state.showResetBtn ? 
            <button className="btn btn-primary mb-2 ml-4 px-5" onClick={this.getAllDeals.bind(this)}>Reset All</button>: null
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
    );

    const searchBar = (
      <div className="input-group my-3">
        <input
          type="text"
          name="dealName"
          className="form-control"
          value={this.state.dealName}
          placeholder="Search Deal by Name"
          onChange={this.onChange} />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={this.searchDealByName.bind(this)}>Search</button>
        </div>
      </div>
    );

    return(
        <div>
          <div className="d-flex justify-content-around">
            <h1
              className={this.state.filerMode === "category" ? "title text-center text-primary" : "title text-center"}
              onClick={() => this.setState({filerMode: "category"})}>
                Explore by Category
            </h1>
            <h1
              className={this.state.filerMode === "name" ? "title text-center text-primary" : "title text-center"}
              onClick={() => this.setState({filerMode: "name"})}>
                Explore by Name
            </h1>
          </div>
          {this.state.filerMode === "category" ? filterbutton : searchBar}
          <div>
            <AllDeals data={this.state.data} />
            { this.state.data.length > 0 ? null : noDealMesage }
            <div className="d-flex justify-content-center my-3">
              {(() => {
                const rows = [];
                for (let i = 1; i <= (this.state.totalDeals / 12) + 1; i++) {
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
