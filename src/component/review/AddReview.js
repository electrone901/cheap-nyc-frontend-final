import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { postReview } from '../../actions/addReview';
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-142224072-1');
}

export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

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

    componentDidMount() {
        initGA();
        loadPageView();
        window.scrollTo(0,0);
        if(this.props.auth.user.name) {
            this.setState({author: this.props.auth.user.name})
        }
        else {
            this.props.history.push("/login");
        }
        
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
                        <h1>Add a review As Member</h1>
                        <form onSubmit={this.onSubmit} className="jumbotron">
                            <div className="form-group">
                                <label htmlFor="text">Rating</label>
                                <div  className={classnames('form-control form-control-lg rating', {
                                        'is-invalid': errors.rating
                                    })}>
                                    <input onChange={this.onChange} value="5" id="star5" name="rating" type="radio" className="radio-btn hide"  />
                                    <label htmlFor="star5" >☆</label>
                                    <input onChange={this.onChange} value="4" id="star4" name="rating" type="radio" className="radio-btn hide" />
                                    <label htmlFor="star4" >☆</label>
                                    <input onChange={this.onChange} value="3"id="star3" name="rating" type="radio" className="radio-btn hide" />
                                    <label htmlFor="star3" >☆</label>
                                    <input onChange={this.onChange} value="2" id="star2" name="rating" type="radio" className="radio-btn hide" />
                                    <label htmlFor="star2" >☆</label>
                                    <input onChange={this.onChange} value="1" id="star1" name="rating" type="radio" className="radio-btn hide" />
                                    <label htmlFor="star1" >☆</label>
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
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateTpProps, {postReview}) (withRouter(AddReview));
