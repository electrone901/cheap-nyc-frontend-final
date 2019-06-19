import React, {Component} from 'react';
import email from '../../img/email-ready.png'; 
import fb from '../../img/fb.png'; 
import instagram from '../../img/ig.png'; 
import twitter from '../../img/t.png'; 

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
              <h4 className="my-5">Plans and Pricing Designed to meet Your Needs</h4>
              <div className="">
                <hr className="bg-danger mb-4" />
                <div className="row -row-social">
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div class="card mb-3">
                      <div class="card-body">
                        <p class="btn btn-primary btn-block">Basic</p>
                        <p class="card-text my-0">1 location</p>
                        <p class="card-text">2 posting</p>
                        <h3 class="card-title text-info">9.99/month</h3>
                        <h5 class="card-title text-danger">2 months free</h5>
                        <p class="card-text">(single menu item)</p>
                        <p class="card-text mb-4">Basic analytics</p>
                      </div>
                    </div>
                    <hr className="bg-danger pb-1" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div class="card mb-3">
                      <div class="card-body">
                        <p class="btn btn-primary btn-block">Starter</p>
                        <p class="card-text my-0">Up to 3 locations</p>
                        <p class="card-text">5 posting each</p>
                        <h3 class="card-title text-info">15.99/month</h3>
                        <h5 class="card-title text-danger">2 months free</h5>
                        <p class="card-text">(single menu item)</p>
                        <p class="card-text my-0">Basic analytics</p>
                        <p class="card-text">Tracking code integration</p>
                      </div>
                    </div>
                    <hr className="bg-danger mb-4 pb-1" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                    <hr className="bg-danger mb-4 py-1" />
                    <div class="card mb-3">
                      <div class="card-body">
                        <p class="btn btn-primary btn-block">Expert</p>
                        <p class="card-text my-0">Up to 20 locations</p>
                        <p class="card-text">20 posting each</p>
                        <h3 class="card-title text-info">20.99/month</h3>
                        <h5 class="card-title text-danger">2 months free</h5>
                        <p class="card-text">(single menu item)</p>
                        <p class="card-text my-0">Advanced analytics</p>
                        <p class="card-text">Tracking code integration</p>
                      </div>
                    </div>
                    <hr className="bg-danger mb-4 pb-1" />
                  </div>
                </div>
                <hr className="bg-danger" />
              </div>
            </div>
          </div>
      );
  }
}
export default Contact;