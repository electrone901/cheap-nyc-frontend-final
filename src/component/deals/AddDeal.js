import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from 'moment';
import ReactGA from 'react-ga';

import PreviewDeal from './PreviewDeal';
import { postDeal } from '../../actions/addPostDeal';


export const initGA = () => {
  ReactGA.initialize('UA-142224072-1');
}
export const loadPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class AddDeal extends Component{
    constructor(){
        super();
        this.state = {
            company: '',
            name: '',
            price: '',
            category: '',
            image: null,
            imageName: 'Choose file',
            address: '',
            city: '',
            description: '',
            author: '',
            formErrors: {},
            companyValid: false,
            nameValid: false,
            categoryValid: false,
            formValid: false,
            priceValid: false,
            addressValid: false,
            cityValid: false,
            descriptionValid: false,
            userId: "",
            startDate: moment()._d,
            endDate: "",
            website: "",
            duration: 0,
            serverErr: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.endDate = this.endDate.bind(this);
        this.startDate = this.startDate.bind(this);
    }

    componentDidMount(){
        initGA();
        loadPageView();
        window.scrollTo(0,0);
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
        }
        else {
            this.setState({
                author: this.props.auth.user.name,
                userId: this.props.auth.user.id
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({serverErr: nextProps.errors})
        }
    }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => {this.validateField(name, value)});
    }

    endDate(date) {
        this.setState({
            endDate: date
        });
        var now = moment(),
        end = moment(date),
        duration = moment(end).diff(now, 'days') + 1;
        this.setState({
            duration: duration
        });
    }
    
    startDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChangeCity(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => {this.validateField(name, value)});
    }


    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imageFile: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let companyValid = this.state.companyValid;
        let nameValid = this.state.nameValid;
        let categoryValid = this.state.categoryValid;
        let priceValid = this.state.priceValid;
        let addressValid = this.state.addressValid;
        let cityValid = this.state.cityValid;
        let descriptionValid = this.state.descriptionValid;


        switch(fieldName) {
            case 'company':
                companyValid = value.length >= 2 && value.length <= 50;
                fieldValidationErrors.company = companyValid ? '' : 'Company should be 2 - 50 characters long';
                break;
            case 'name':
                nameValid = value.length >= 2 && value.length <= 30;
                fieldValidationErrors.name = nameValid ? '' : 'Item should be 2 - 30 characters long';
                break;
            case 'category':
                categoryValid = value.length >=2 && value.length <= 30;
                fieldValidationErrors.category = categoryValid ? '' : 'Please select the Category';
                break;
            case 'price':
                priceValid = value.length >= 1 && value.length <= 6 && value <= 30;
                fieldValidationErrors.price = priceValid ? '' :'Please enter a vaild price, ex - 1.99';
                break;
            case 'address':
                addressValid = value.length >= 10 && value.length <=70;
                fieldValidationErrors.address = addressValid ? '': 'Please enter a valid location';
                break;
            case 'city':
                cityValid = value.length >= 2 && value.length <=30;
                fieldValidationErrors.city = cityValid ? '': 'Please select a city';
                break;
            case 'description':
                descriptionValid = value.length >= 5 && value.length <=500;
                fieldValidationErrors.description = descriptionValid ? '': 'Description  should be 5 - 500 characters long';
                break;
            default:
                break;
        }
        // APPEND fieldValidationErrors RESULTS TO formErrors & KEEP TRACK OF  VALID FIELDS TO TO HELP ENABLE SUBMIT
        this.setState({
            formErrors: fieldValidationErrors,
            companyValid: companyValid,
            nameValid: nameValid,
            categoryValid: categoryValid,
            priceValid: priceValid,
            addressValid: addressValid,
            cityValid: cityValid,
            descriptionValid: descriptionValid
        }, this.validateForm);
    }

    // ENABLES SUBMIT BUTTON
    validateForm() {
        this.setState({formValid: this.state.companyValid && this.state.nameValid && this.state.categoryValid && this.state.priceValid && this.state.addressValid && this.state.cityValid && this.state.descriptionValid
        });
    }

    
    // formData allows to append data to obj
    onSubmit(e){
        e.preventDefault();
        this.setState({previewPost: true});
        window.scrollTo(0,0);
    }

    edit(e) {
        e.preventDefault();
        this.setState({previewPost: false});
        window.scrollTo(0,0);
    }

    postDealToDataBase(e) {
        const formData = new FormData();
        formData.append('company', this.state.company);
        formData.append('price', this.state.price);
        formData.append('name', this.state.name);
        formData.append('category', this.state.category);
        formData.append('image', this.state.image);
        formData.append('location', this.state.address);
        formData.append('city', this.state.city);
        formData.append('description', this.state.description);
        formData.append('userId', this.state.userId);
        formData.append('author', this.props.auth.user.name);
        formData.append('duration', this.state.duration);
        formData.append('startDate', this.state.startDate)
        formData.append('endDate', this.state.endDate)
        formData.append('website', this.state.website)

        this.props.postDeal(formData, this.props.history);
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }
    
    render(){
        const { serverErr } = this.state;

        let form = <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Posting as Member</h1>

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="text">Company name</label>
                            <input
                                type="text"
                                required className={classnames('form-control form-control-lg', {
                                    'is-invalid': this.state.formErrors.company
                                })}
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange} 
                            />
                            {<div className="invalid-feedback">{this.state.formErrors.company}</div>}
                            {serverErr.company && (<div className="invalid-feedback">{serverErr.company}</div>)}
                        </div>

                        <div className="form-group row"> 

                            <div className="col-md-8">
                                <label htmlFor="text">Item name</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': this.state.formErrors.name
                                    })}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange} 
                                />
                                <div className="invalid-feedback">{this.state.formErrors.name}</div>
                                {serverErr.name && (<div className="invalid-feedback">{serverErr.name}</div>)}
                            </div>

                            <div className="form-group col-sm-12 col-md-4">
                                <label htmlFor="text">Category <span className="require">*</span> </label>
                                <select
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.onChange}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': this.state.formErrors.category
                                    })}
                                    required
                                >
                                    <option value="">Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Activities">Activities</option>
                                    <option value="Events">Events</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Music">Music</option>
                                    <option value="Classes">Classes</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Social">Social</option>
                                    <option value="Others">Others</option>
                                </select>
                                <div className="invalid-feedback">{this.state.formErrors.name}</div>
                                {serverErr.name && (<div className="invalid-feedback">{serverErr.name}</div>)}
                            </div>
                        </div>

                        <div className="form-group row"> 
                            <div className="col">
                                <label htmlFor="text">Item price</label>
                                <input
                                    type="any"
                                    id="price" 
                                    min="0" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': this.state.formErrors.price
                                    })}
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChange} 
                                />
                                <div className="invalid-feedback">{this.state.formErrors.price}</div>
                                {serverErr.price && (<div className="invalid-feedback">{serverErr.price}</div>)}
                            </div>
                            
                            <div className="col">
                                <label htmlFor="text" >Deal Starts</label>
                                <DatePicker
                                    className="input-text2 form-control form-control-lg"
                                    placeholderText="Required"
                                    selected={this.state.startDate}
                                    onChange={this.startDate} 
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>

                            
                            <div className="col">
                                <label htmlFor="text">Deal Ends</label>
                                <DatePicker
                                    className="input-text2 form-control form-control-lg"
                                    placeholderText="Required"
                                    selected={this.state.endDate}
                                    onChange={this.endDate} 
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                        </div>

                        <div className="form-group row"> 
                            <div className="col-md-8">
                                <label htmlFor="text">Address:  <span className="small">(eg:123 StreetName, Borough, NY ZipCode)</span> </label>
                                <input
                                    type="text" 
                                    id="address" 
                                    min="5" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': this.state.formErrors.address
                                    })}
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChange} 
                                />
                                <div className="invalid-feedback">{this.state.formErrors.address}</div>
                                {serverErr.address && (<div className="invalid-feedback">{serverErr.address}</div>)}
                            </div>

                            <div className="col-sm-12 col-md-4"> 
                                <label htmlFor="text">City <span className="require">*</span> </label>
                                <select
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    className={classnames('form-control form-control-lg ', {
                                        'is-invalid': this.state.formErrors.city
                                    })}
                                >
                                    <option value="">City</option>
                                    <option value="Manhattan">Manhattan</option>
                                    <option value="Queens">Queens</option>
                                    <option value="Bronx">Bronx</option>
                                    <option value="Brooklyn">Brooklyn</option>
                                    <option value="Staten Island">Staten Island</option>
                                </select>
                                <div className="invalid-feedback">{this.state.formErrors.city}</div>
                                {serverErr.city && (<div className="invalid-feedback">{serverErr.city}</div>)}
                            </div>
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Item Description</label>
                            <textarea 
                                type="text" 
                                id="description" 
                                min="5" 
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': this.state.formErrors.description
                                })}
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange} 
                                rows="3">
                            </textarea>
                            <div className="invalid-feedback">{this.state.formErrors.description}</div>
                            {serverErr.description && (<div className="invalid-feedback">{serverErr.description}</div>)}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="text">Upload an image <span className="small">(Optional but recommended)</span></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"></span>
                                </div>
                                <div className="custom-file">
                                    <input 
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        onChange={this.fileSelectedHandler}/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.imageName}</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Company website <span className="small">(Optional but recommended)</span></label>
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': this.state.formErrors.website
                                })}
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange} 
                            />
                            {<div className="invalid-feedback">{this.state.formErrors.website}</div>}
                            {serverErr.website && (<div className="invalid-feedback">{serverErr.website}</div>)}
                        </div>


                        <input type="submit" className="btn btn-info btn-block mt-4" disabled={!this.state.formValid} />
                    </form>

                </div>
            </div>
        </div>
        return(
            <div className="addDeal">
                { this.state.previewPost ?
                    <PreviewDeal
                        dealData={this.state}
                        edit={this.edit.bind(this)}
                        loading={this.props.loading.postLoading}
                        postDeal={this.postDealToDataBase.bind(this)} />
                         : form }
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loading: state.postDeal
});

export default connect(mapStateToProps, {postDeal})(AddDeal);