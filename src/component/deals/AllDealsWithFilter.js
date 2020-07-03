import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AllDeals from './AllDeals';
import { getDeals } from '../../actions/addPostDeal';
import ReactGA from 'react-ga';

import FilterButtons from './FilterButtons';
import SearchBar from '../common/SearchBar';

export const initGA = () => {
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
      searchImg: true, 
      dealName: ''
    };
    this.loadPage = this.loadPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.findDeals = this.findDeals.bind(this);
    this.getAllDeals = this.getAllDeals.bind(this);
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
    initGA();
    loadPageView();
    window.scrollTo(0,0);
    let url = "https://cnycserver.herokuapp.com/items";
    fetch(url)
    .then(res => {
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
    const filterbutton = (
      <FilterButtons
        showResetBtn={this.state.showResetBtn}
        selectValue={this.state.selectValue}
        value={this.state.value}
        findDeals={this.findDeals}
        getAllDeals={this.getAllDeals}
        handleChangeCategory={this.handleChangeCategory}
        handleChangeCity={this.handleChangeCity}
        handleChangePrice={this.handleChangePrice} />
    );

    const searchBar = (
      <SearchBar
        name="dealName"
        value={this.state.dealName}
        placeholder="Search Deal by Name"
        onChange={this.onChange}
        onKeyPress={e => e.key === "Enter" ? this.searchDealByName() : null}
        onClick={this.searchDealByName.bind(this)}
        btnLabel="Search" />
    );

    return(
        <div>
          
          <div className="d-flex justify-content-around mt-3">
            <h2
              className={this.state.filerMode === "category" ? "title text-center text-primary underline" : "title text-center cursor-pointer"}
              onClick={() => this.setState({filerMode: "category"})}>
                <span role="img" aria-label="sparkles">✨</span>Explore by Category
            </h2>
            <h2
              className={this.state.filerMode === "name" ? "title text-center text-primary underline" : "title text-center cursor-pointer"}
              onClick={() => this.setState({filerMode: "name", searchImg: false})}>
                Explore by Name<i className="fas fa-search"></i>
            </h2>
          </div>

          {this.state.filerMode === "category" ? filterbutton : searchBar}
          <div>
            <AllDeals data={this.state.data} />
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
