import React, {Component} from 'react';

class Contact extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){
      
      return(
          <div className="text-center">
            <h1>Contact Us</h1>
            <h2>Email: realcheapny@gmail.com</h2>
            <h2>Check us out on our social media!</h2>
            <ul>
              <li className="list-inline-item"><a href="https://www.facebook.com/realcheapny/" target="blank"><i className="fa fa-facebook-square fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="https://twitter.com/realcheapny" target="blank"><i className="fa fa-twitter fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/realcheapny/" target="blank"><i className="fa fa-instagram fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/realcheapny/" target="blank"><i className="google-plus-g fa fa-google-plus fa-2x"></i></a></li>
              <li className="list-inline-item"><a href="https://www.facebook.com/groups/YoAmoNuevaYork/" target="blank"><i className="fa fa-envelope fa-2x"></i></a></li>
            </ul>
          </div>
      );
  }
}
export default Contact;