import React, {Component} from 'react';

class Feedback extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){
      
      return(
          <div className="text-center">
            <iframe className="frame-custome" src="https://docs.google.com/forms/d/e/1FAIpQLSeMpj-bBwnr7MJ0ba8ExaWFpwRlShtkVx9Mw8W6RSN9zWXssw/viewform?embedded=true"  frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>

          </div>
      );
  }
}
export default Feedback;