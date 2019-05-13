import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReviewPopup extends Component {
    render() {
        console.log('props reviewPopup', this.props.id)
        let { id } = this.props;
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="space-top">{this.props.title}</h1>
            <p className="small">{this.props.text}</p>
            <div className="d-flex justify-content-around flex-wrap">
              <div className="padding-top my-1">
                <Link to={`/addReview/${id}`} className="btn btn-primary btn-width" onClick={this.props.closePopup}>As Member <i className="fa fa-check" aria-hidden="true"></i></Link>
              </div>
              <div className="padding-top my-1">
                <Link to={`/addReview-guest/${id}`} className="btn btn-primary btn-width" onClick={this.props.closePopup}>As Guest</Link>
              </div>
            </div>
            <div className="padding-top mt-3">
              <button className="btn-info-helpful" onClick={this.props.closePopup}>Close me</button>
            </div>
          </div>
        </div>
      );
    }
  }

export default ReviewPopup;
