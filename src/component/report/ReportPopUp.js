import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { postReport } from '../../actions/reportActions';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('**initGA');
  ReactGA.initialize('UA-142224072-1');
}
export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class ReportPopUp extends Component {
    constructor() {
        super();
        this.state = {
            reason: '',
            reason_comment_description: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        initGA();
        loadPageView();
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    notify = () => {
        toast.success("✨ Success!! Thank You For Your Input.")
    }

    onSubmit(e) {
        e.preventDefault();
        let { id } = this.props;
        const reportData = {
            text: this.state.reason,
            comments: this.state.reason_comment_description
        };
        this.props.postReport(reportData, id);
        this.props.closePopup();
        this.notify();
    }
    
    render() {
        const {errors} = this.state;
        return (
            <div className='popup'>
            <div className='popup_inner'>
            <ToastContainer />
                <p className="font-content">{this.props.title}</p>
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
                                id="reason_comment_description" 
                                min="5" 
                                className="textArea"
                                name="reason_comment_description"
                                value={this.state.reason_comment_description}
                                onChange={this.onChange} 
                                >
                            </textarea>
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, {postReport})(ReportPopUp);

