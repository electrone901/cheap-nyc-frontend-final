/******************************************************************************
Title           : LeftArrow.js
Description     : is the left arrow of our carousel  using font-awesome 
******************************************************************************/

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class TextSlider extends Component {
    constructor() {
        super();
        this.state = {
            auth: false
        }
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            console.log(' YES user logged this.props.auth.isAuthenticated', this.props)
            this.setState({
                auth: true
            })
        }
    }
    render() {
        return (
            <div className="tParent">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="textSliderTitle">Find the best NY deals</h1>
                        <h2 className="textSliderTitle">free or under $30</h2>
                        <p className="tParent__items__subTittle">Do more with less</p>
                        {
                            this.state.auth ? null:<Link to="/register" className="tParent__items__sign">Sign Up</Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps) (withRouter(TextSlider));
  

