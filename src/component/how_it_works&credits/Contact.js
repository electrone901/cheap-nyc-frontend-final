import React, {Component} from 'react';
import email from '../../img/email-ready.png'; 
import fb from '../../img/fb.png'; 
import instagram from '../../img/ig.png'; 
import twitter from '../../img/t.png'; 

import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('**initGA contact');
  ReactGA.initialize('UA-142224072-1');
}
export const loadPageView = () => {
  ReactGA.set({page: window.location.pathname});
  ReactGA.pageview(window.location.pathname);
}

class Contact extends Component{
  componentDidMount(){
    window.scrollTo(0,0);
    initGA();
    loadPageView();
  }
  render(){
      
      return(
        // download the logos and added them 
          <div className="container">
            <br/>
            <div className="text-center">
              <div className="jumbotron">
                <h1>Contact Us</h1>
                <h2>Email: realcheapny@gmail.com</h2>
                <h2>Check us out on our social media!</h2><br/>
                <div className="row -row-social">
                  <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <a href="https://www.facebook.com/realcheapny/" target="blank"><img className="social-thumbnail" src={fb}/></a>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <a href="https://www.instagram.com/realcheapny/" target="blank"><img className="social-thumbnail" src={instagram}/></a>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <a href="https://twitter.com/realcheapny" target="blank"><img className="social-thumbnail" src={twitter}/></a>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                    <a href="mailto:realcheapny@gmail.com"><img className="social-thumbnail" src={email}/></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
}
export default Contact;