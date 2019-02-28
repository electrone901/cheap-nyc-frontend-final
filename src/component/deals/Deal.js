import React, {Component} from 'react';

class Deals extends Component{
    componentDidMount() {
        const { id } = this.props.match.params;
        let url = `https://cnycserver.herokuapp.com/items/${id}`;
        console.log(url);
        fetch(`https://cnycserver.herokuapp.com/items/${id}`)
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
    
    render(){
      return(
          <div className="container">
              <h1>hi</h1>
          </div>
      );
    }
}
export default (Deals);