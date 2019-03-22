import React, {Component} from 'react';
import  { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import image2 from '../../img/stocks.png';
import { postDeal } from '../../actions/addPostDeal';
import { getDeal } from '../../actions/addPostDeal';
 
class PreviewConfirmationPost extends Component{
    constructor() {
        super();
        this.state = {
            data: '',
            reviews: null
        }
    }


    componentDidMount() {
        window.scrollTo(0,0);
        let id = this.props.match.params.id;
        let url = `https://cnycserver.herokuapp.com/items/${id}`;
        
        this.props.getDeal(url);
    }

    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('company', this.state.company);
        formData.append('price', this.state.price);
        formData.append('name', this.state.name);
        formData.append('category', this.state.category);
        formData.append('image', this.state.image);
        formData.append('location', this.state.address);
        formData.append('city', this.state.city);
        formData.append('description', this.state.description);
        formData.append('author', this.state.author);
        this.props.postDeal(formData, this.props.history);
    }

    
    render(){

      return(
          <div className="container">

            <div className="row text-center space-top">
                <div className="col-12 col-sm-12 col-md-12">
                    <h2>Confirm the information below, you cannot edit after publishing
                    </h2>
                </div>
            </div>
            <div className="text-center background">
                {/* <img src={post.image ? post.image: image2} className="img-thumbnail" alt="Responsive" /> */}
            </div>

    

            <div className="space-top">
                {/* <p> <span className="field-name"> Company Name: </span>{post.company}</p>
                <p> <span className="field-name"> Item name: </span>{post.name}</p>
                <p> <span className="field-name"> Category: </span> {post.category}</p>
                <p> <span className="field-name"> Item price: </span> {post.price}</p>
                <p> <span className="field-name"> Address: </span>{post.location}</p>
                <p> <span className="field-name"> City: </span>{post.city}</p>
                <p> <span className="field-name"> Product Description: </span>{post.description}</p>        */}
            </div>
            <br/>
            <hr/>              
          </div>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {getDeal}) (withRouter(PreviewConfirmationPost));