import React, {Component} from 'react';
import email from '../../img/email-ready.png'; 
import fb from '../../img/fb.png'; 
import instagram from '../../img/ig.png'; 
import twitter from '../../img/t.png'; 

import ReactGA from 'react-ga';

export const initGA = () => {
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
      <div className="container mt-5 text-center">
        <div className="jumbotron">
          <h1 className="color-p">Contact Us</h1>
          <h3 className="mb-5">Email: realcheapny@gmail.com</h3>
          <h2 className="mb-4">Check us out on our social media!</h2>
          <div className="d-flex justify-content-around flex-wrap">
            <div className="mb-3">
              <a href="https://www.facebook.com/realcheapny/" target="blank">
                <img className="social-thumbnail" alt="facebookIcon" src={fb}/>
              </a>
            </div>
            <div className="mb-3">
              <a href="https://www.instagram.com/realcheapny/" target="blank">
                <img className="social-thumbnail" alt="instagramIcon" src={instagram}/>
              </a>
            </div>
            <div className="mb-3">
              <a href="https://twitter.com/realcheapny" target="blank">
                <img className="social-thumbnail" alt="twitterIcon" src={twitter}/>
              </a>
            </div>
            <div className="mb-3">
              <a href="mailto:realcheapny@gmail.com">
                <img className="social-thumbnail" alt="emailIcon" src={email}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;