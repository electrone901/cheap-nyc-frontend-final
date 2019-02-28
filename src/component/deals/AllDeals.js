import React, { Component } from 'react';
import request from 'request-promise';
import { connect } from 'react-redux';
import { withRouter   } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';

class AllDeals extends Component{
    constructor(){
        super();
        this.state = {
            stocks: [],
            name: '',
            error: '',
            quantity: 1,
            show: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
     
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit(e){
        e.preventDefault();
    }
    render(){
        console.log('data', this.state.data);
        
        return(
            <div className="container">

                <div className="container">
            
                    <div className="row">

                    {
                        this.state.data ? this.state.data.map((item, key) => {
                            return (
                                <div className="col-lg-3 col-12 text-center">
                                    <div className="border">
                                        <h5>{item.name}  ${item.price} </h5> 
                                        <figure className="figure">
                                            <img src={item.image ? item.image : 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/90V03Q5Y60.jpg'} className="figure-img img-fluid rounded" alt="deal"/>
                                            <div className="container2">
                                                <figcaption className="figure-caption container2-item">Location: {item.city ? item.city : "None"}</figcaption>
                                                <Link to="/portfolio" className="container2-item-btn">
                                                    Details
                                                </Link>
                                            </div>
                                        </figure>
                                    </div>
                                </div> 
                            );
                        }): <Spinner />
                    }

                    </div>

                </div>

            </div>
        );
    }
}

export default (AllDeals);