/******************************************************************************
Title           : DealByCatergories.js
Description     : A file that contains prices clasification
******************************************************************************/
import React, { Component } from 'react';
import '../../sass/main.scss';
import { Link } from 'react-router-dom';

class Prices extends Component {
    constructor() {
        super();
        this.state = {
            // THIS IS HOW CREATE REACT APP WORKS WITH IMAGES: PUT IMAGES IN PUBLIC FOLDER AND PATH= 'images/pictureName'
            data: [
                {'img':'images/free.png',  'price':'free', 'range': 'type=price&price1=0&price2=0'},
                {'img':'images/under_1.jpg',  'price':'under $ 1', 'range': 'type=price&price1=0&price2=1'},
                {'img':'images/under_5.jpg',  'price':'under $ 5', 'range': 'type=price&price1=0&price2=5'},
                {'img':'images/under_10.jpg',  'price':'under $ 10', 'range': 'type=price&price1=0&price2=10'},
                {'img':'images/under_15.jpg',  'price':'under $ 15', 'range': 'type=price&price1=0&price2=15'},
                {'img':'images/under_20.jpg',  'price':'under $ 20', 'range': 'type=price&price1=0&price2=20'},
                {'img':'images/under_30.jpg',  'price':'under $ 30', 'range': 'type=price&price1=0&price2=30'},
                {'img':'images/over_50.jpg',  'price':'under $ 50', 'range': 'type=price&price1=0&price2=50'},
                {'img':'images/over_50.jpg',  'price':'over $ 50', 'range': 'type=price&price1=0&price2=50'},
                {'img':'images/bestDeals.jpg',  'price':'Best Deals', 'range': 'bestDeals'},
                {'img':'images/overrated.jpg',  'price':'Overated', 'range': 'overated'},
                {'img':'images/priceles.jpg',  'price':'Priceless', 'range': 'priceless'}
            ],
        }
    }
    render() {
        return (
                <section className="price-container">
                    <h1 className="title">Explore by category</h1>
                    <div className="parent">
                        {
                            this.state.data.map((item, key) => {
                                return (
                                    <div className="parent__items" key={key}>
                                        <Link to={`/itemsListPrice/${item.range}`}>
                                            <img src={item.img} alt="details" className="parent__items__img"/><br/>
                                            {item.price}
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>                
                </section>
        )
    }
}

export default Prices;

