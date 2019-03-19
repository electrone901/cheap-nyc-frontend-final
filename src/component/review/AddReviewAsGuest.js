import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { postReview } from '../../actions/addReview';

class AddReviewAsGuest extends Component {
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

    componentDidMount() {
        window.scrollTo(0,0);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const reviewData = {
            name: this.state.author,
            rating: this.state.rating,
            text: this.state.description,
        };
        this.props.postReview(reviewData, this.props.match.params.id, this.props.history);
    }
 
    render() {
        const {errors} = this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1>Add a review As Guest</h1>
                        
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="text">Author</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                    name="author"
                                    value={this.state.author}
                                    onChange={this.onChange} 
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>

                            <div className="form-group">
                                <label htmlFor="text">Rating</label>
                                <div  className={classnames('form-control form-control-lg rating', {
                                        'is-invalid': errors.rating
                                    })}>
                                    <input onChange={this.onChange} value={this.state.rating} id="star5" name="rating" type="radio" value="5" className="radio-btn hide"  />
                                    <label htmlFor="star5" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star4" name="rating" type="radio" value="4" className="radio-btn hide" />
                                    <label htmlFor="star4" >☆</label>
                                    <input  onChange={this.onChange} value={this.state.rating}id="star3" name="rating" type="radio" value="3" className="radio-btn hide" />
                                    <label htmlFor="star3" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star2" name="rating" type="radio" value="2" className="radio-btn hide" />
                                    <label htmlFor="star2" >☆</label>
                                    <input onChange={this.onChange} value={this.state.rating} id="star1" name="rating" type="radio" value="1" className="radio-btn hide" />
                                    <label htmlFor="star1" >☆</label>
                                    <div className="clear"></div>
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
                                        'is-invalid': errors.text
                                    })}
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange} 
                                    rows="3"
                                    >
                                </textarea>
                                {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
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
export default connect(mapStateTpProps, {postReview})(AddReviewAsGuest);

