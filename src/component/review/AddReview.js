import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { postReview } from '../../actions/addReview';

class AddReview extends Component {
    constructor() {
        super();
        this.state = {
            author: '',
            rating: null,
            description: '',
            errors: {}
            
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        console.log('rating', e.target.value)
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        let itemId = this.props.match.params.id;
        const formData = new FormData();
                    //    https://cnycserver.herokuapp.com/items/:itemId/reviews
        let urlBase = "https://cnycserver.herokuapp.com/items/";
        let url = urlBase + itemId + '/reviews';
        
        let data = {
            name: this.state.author,
            rating: this.state.rating,
            text: this.state.description,
        };
        console.log('this.state', this.state);
        console.log('data', data);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
                'Content-Type': 'application/json'
            }
        }) 
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .then(this.props.history.push(`/`))
        .catch(error => console.error('Error:', error));

        // .then(resData => {
        //     console.log(resData);
        //     return resData.json();
        // })
        // .then(resData => {
        //     this.props.history.push( `/deal/${itemId}`);
        //     // /deal/5c6b8d9da52f412971081dab
        // })
        // .catch(err => {
        //     console.log("error: " + err);
        // });
    }


    render() {
        console.log('this.state',this.state.id)
        
        const {errors} = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1>Add a review</h1>
                        
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="text">Author</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-text': errors.author
                                    })}
                                    name="author"
                                    value={this.state.author}
                                    onChange={this.onChange} 
                                />
                                {errors.author && (<div className="invalid-feedback">{errors.author}</div>)}
                            </div>

                            <div className="form-group">
                                <label htmlFor="text">Rating</label>
                                <div class="rating">
                                    <input onChange={this.onChange} value={this.state.rating} id="star5" name="rating" type="radio" value="5" className="radio-btn hide"  />
                                    <label for="star5" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star4" name="rating" type="radio" value="4" className="radio-btn hide" />
                                    <label for="star4" >☆</label>
                                    <input  onChange={this.onChange} value={this.state.rating}id="star3" name="rating" type="radio" value="3" className="radio-btn hide" />
                                    <label for="star3" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star2" name="rating" type="radio" value="2" className="radio-btn hide" />
                                    <label for="star2" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star1" name="rating" type="radio" value="1" className="radio-btn hide" />
                                    <label for="star1" >☆</label>
                                    <div class="clear"></div>
                                </div>
                                {errors.rating && (<div className="invalid-feedback">{errors.rating}</div>)}
                            </div>


                            <div className="form-group">
                                <label htmlFor="text">Review</label>
                                <textarea 
                                    type="text" 
                                    id="description" 
                                    min="5" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-text': errors.description
                                    })}
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange} 
                                    id="description" 
                                    rows="3"
                                    className="form-control">
                                </textarea>
                                {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    
                    
                    </div>
                </div>
            </div>
       
       )
    }


}

const mapStateTpProps = state => ({
    errors: state.errors
})
export default connect(mapStateTpProps, {postReview})(AddReview);


// Link - https://cnycserver.herokuapp.com/items/:itemId/reviews
// Request - POST
// Body - name, rating, text