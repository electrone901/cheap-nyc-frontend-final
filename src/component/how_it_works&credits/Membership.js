import React, {Component} from 'react';

class Contact extends Component{
  componentDidMount(){
    window.scrollTo(0,0);
  }
  render(){
      return(
          <div className="container">
            <br/>
            <div className="text-center">
              <h1 className="bg-danger text-light">Membership</h1>
              <h4 className="my-4">Plans and Pricing Designed to meet Your Needs</h4>
              <div className="">
                <div className="row -row-social">
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div className="card mb-3">
                      <div className="card-body">
                        <p className="btn btn-primary btn-block">Basic</p>
                        <p className="card-text my-0">1 location</p>
                        <p className="card-text">2 posting</p>
                        <h3 className="card-title text-info">9.99/month</h3>
                        <h5 className="card-title text-danger">2 months free</h5>
                        <p className="card-text">(single menu item)</p>
                        <p className="card-text mb-4">Basic analytics</p>
                      </div>
                    </div>
                    <hr className="bg-danger pb-1" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div className="card mb-3">
                      <div className="card-body">
                        <p className="btn btn-primary btn-block">Starter</p>
                        <p className="card-text my-0">Up to 3 locations</p>
                        <p className="card-text">5 posting each</p>
                        <h3 className="card-title text-info">15.99/month</h3>
                        <h5 className="card-title text-danger">2 months free</h5>
                        <p className="card-text">(single menu item)</p>
                        <p className="card-text my-0">Basic analytics</p>
                        <p className="card-text">Tracking code integration</p>
                      </div>
                    </div>
                    <hr className="bg-danger mb-4 pb-1" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div className="card mb-3">
                      <div className="card-body">
                        <p className="btn btn-primary btn-block">Expert</p>
                        <p className="card-text my-0">Up to 20 locations</p>
                        <p className="card-text">20 posting each</p>
                        <h3 className="card-title text-info">20.99/month</h3>
                        <h5 className="card-title text-danger">2 months free</h5>
                        <p className="card-text">(single menu item)</p>
                        <p className="card-text my-0">Advanced analytics</p>
                        <p className="card-text">Tracking code integration</p>
                      </div>
                    </div>
                    <hr className="bg-danger mb-4 pb-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
}
export default Contact;