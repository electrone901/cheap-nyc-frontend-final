import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class ReportPopUp extends Component {
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
        console.log('click', )
        e.preventDefault();
        const reviewData = {
            name: this.state.author,
            rating: this.state.rating,
            text: this.state.description,
        };
        this.props.postReview(reviewData, this.props.match.params.id, this.props.history);
    }

    
    render() {
        console.log('props reviewPopup', this.props.id)
        let { id } = this.props;
        const {errors} = this.state;
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="space-top">{this.props.title}</h1>
            <p className="small">{this.props.text}</p>
            
            <div className="col-md-8 m-auto">
                <form onSubmit={this.onSubmit}>

                    <div className="dropdown col-lg-12 col-md-12 col-sm-12">
                        <select
                            value={this.state.selectValue}
                            onChange={this.handleChangeCity}
                            className="btn btn-light dropdown-toggle btn-width btn-height textArea"
                        > 
                            <option value="">Select One</option>
                            <option value="Manhattan">Manhattan</option>
                            <option value="Queens">Queens</option>
                            <option value="Bronx">Bronx</option>
                            <option value="Brooklyn">Brooklyn</option>
                            <option value="Staten Island">Staten Island</option>
                        </select>
                    </div>

                    <div className="form-group space-top">
                        <textarea 
                            type="text" 
                            id="description" 
                            min="5" 
                            className="textArea"
                            // className={classnames('', {
                            //     'is-invalid': errors.text
                            // })}
                            name="description"
                            value={this.state.description}
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
