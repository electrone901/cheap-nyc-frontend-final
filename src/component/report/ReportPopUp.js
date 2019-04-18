import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class ReportPopUp extends Component {
    constructor() {
        super();
        this.state = {
            author: '',
            reason: '',
            reason_description: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     window.scrollTo(0,0);
    //     if(this.props.auth.user.name) {
    //         this.setState({author: this.props.auth.user.name})
    //     }
    //     else {
    //         this.props.history.push("/login");
    //     }
        
    // }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        console.log('click', this.state)
        e.preventDefault();
        
        // Request - POST
        // Params - Replace ':itemId' with an id of a item
        // Required Fields - text(string)
        // Login is required
        // let url = "https://cnycserver.herokuapp.com/items/" + itemId + "/report";


        // const reviewData = {
        //     name: this.state.author,
        //     rating: this.state.rating,
        //     text: this.state.description,
        // };
        // this.props.postReview(reviewData, this.props.match.params.id, this.props.history);
    }

    
    render() {
        console.log('props reviewPopup', this.props.id)
        let { id } = this.props;
        const {errors} = this.state;
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="space-top">{this.props.title}</h1>
            <p className="font-content">{this.props.text}</p>
            
            <div className="col-md-8 m-auto space-top">
                <form onSubmit={this.onSubmit}>

                    <div className="dropdown col-lg-12 col-md-12 col-sm-12">
                        <select
                            required
                            name="reason"
                            value={this.state.reason}
                            onChange={this.onChange}
                            className="btn btn-light dropdown-toggle btn-width btn-height textArea"
                        > 
                            <option value="">Select One</option>
                            <option value="It's expired">It's expired</option>
                            <option value="I'm not satisfied with the service or product">I'm not satisfied with the service or product</option>
                            <option value="It's a duplicate post">It's a duplicate post</option>
                            <option value="Invalid Location">Invalid Location</option>
                            <option value="It's a scam">It's a scam</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group space-top">
                        <label htmlFor="text">Other reason or comments</label>
                        <textarea 
                            type="text" 
                            id="reason_description" 
                            min="5" 
                            className="textArea"
                            // className={classnames('', {
                            //     'is-invalid': errors.text
                            // })}
                            name="reason_description"
                            value={this.state.reason_description}
                            onChange={this.onChange} 
                            rows="3"
                            >
                        </textarea>
                        {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                    </div>
                    <div className="row text-center">
                        <div className="col-lg-6 col-md-6 col-sm-4 padding-top">
                            <button className="btn btn-danger btn-width" onClick={this.props.closePopup}>Close me</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-4 padding-top">
                            <input type="submit" className="btn btn-primary btn-width" />
                        </div>
                    </div>
                </form>
            </div>

            
          </div>
        </div>


      );
    }
  }

export default ReportPopUp;
