/******************************************************************************
Title           : AddDealsAsGuest.js
Description     : A file that contains form to add post as a guest
******************************************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { postDeal } from '../../actions/addPostDeal';

class AddDealAsGuest extends Component{
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
            errors: {},
            err : {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/portfolio');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps: ",nextProps.errors);
        // console.log("Item name: ",nextProps.errors[0].msg);
        if(nextProps.errors){
            const {err} = this.state;
            err.name = nextProps.errors[0].msg;
            err.category = nextProps.errors[1].msg;
            err.price = nextProps.errors[2].msg;
            err.location = nextProps.errors[3].msg;
            err.city = nextProps.errors[4].msg;
            err.description = nextProps.errors[5].msg;
            err.company = nextProps.errors[6].msg;
            err.author = nextProps.errors[7].msg;
            // this.setState({err: nextProps.errors});
        } 
        else {
        // this.props.history.push('/portfolio');
        console.log('Deal was Posted!!!')
        }


    }


    // componentDidUpdate(prevProps, prevState) {
    //     console.log("error componentDidUpdate: ",this.state.errors);
    //     if(this.state.errors) {
    //         this.state.errors.map((ele) => {
    //             this.setState({what: ele.msg})
    //             // console.log('ele', ele)
    //         })
    //         console.log('luis', this.state.errors) 
    //     }
    //     if(this.state.containerWidth !== prevState.containerWidth) { 
    //         this.getNumberOfItems();
    //     }
    // }
      

    
    onChange(e){

        this.setState({[e.target.name]: e.target.value});
    }
    handleChangeCity(e) {
        console.log('city', e.target.value)
        this.setState({city: e.target.value});
    }

    handleChangeCategory(e) {
        console.log('category', e.target.value)
        this.setState({category: e.target.value});
    }
    
    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
    }
    
    // formData allows to append data to obj
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
        
        // const postData = {
        //     body: formData
        // }
        // console.log("this.props.postDeal ", this.props);
        this.props.postDeal(formData);


        // let url = 'https://cnycserver.herokuapp.com/items';
        // let method = 'POST';

        // fetch(url, {
        //     method: method,
        //     body: formData
        // })
        // .then(res => {
        //     console.log(res);
        //     return res.json();
        // })
        // .then(res => {
        //     console.log("error", res);
        //      if (res.status !== 200 && res.status !== 201) {
        //         this.setState({errors: res});
        //         console.log("state", this.state.errors);
        //         throw new Error('Creating or editing a post failed!');
        //       }
        //     //  this.props.history.push('/');
        // })
        // .catch(err => {
        //     console.log("error: from cathch" + err);
        // });
    }
    
    
    render(){
        const {err} = this.state;
        // if(this.state.errors.length > 0) {
        //     err.name = this.state.errors[0].msg;
        //     err.category = this.state.errors[1].msg;
        //     err.location = this.state.errors[2].msg;
        //     err.city = this.state.errors[3].msg;
        //     err.description = this.state.errors[4].msg;
        //     err.company = this.state.errors[5].msg;
        //     err.author = this.state.errors[6].msg;
        // }

        console.log("state", this.state);
        return(
            <div className="addDeal">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Create a post as Guest</h1>
                      <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label htmlFor="text">Company name</label>
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': err.company
                                })}
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange} 
                            />
                            {err.company && (<div className="invalid-feedback">{err.company}</div>)}
                        </div>

                        <div className="form-group row"> 

                            <div className="col-md-8">
                                <label htmlFor="text">Item name</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': err.name
                                    })}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange} 
                                />
                                {err.name && (<div className="invalid-feedback">{err.name}</div>)}
                            </div>

                            <div className="form-group col-sm-12 col-md-4">
                                <label htmlFor="text">Category</label>
                                <select
                                    name="category"
                                    value={this.state.selectValue}
                                    onChange={this.handleChangeCategory}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': err.category
                                    })}
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
                                {err.category && (<div className="invalid-feedback">{err.category}</div>)}
                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Item price</label>
                            <input
                                type="number" 
                                id="price" 
                                min="0" 
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': err.price
                                })}
                                name="price"
                                value={this.state.price}
                                onChange={this.onChange} 
                            />
                            {err.price && (<div className="invalid-feedback">{err.price}</div>)}
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

                        <div className="form-group row"> 
                            <div className="col-md-8">
                                <label htmlFor="text">Address:  <span className="small">(eg:123 StreetName, Borough, NY ZipCode)</span> </label>
                                <input
                                    type="text" 
                                    id="address" 
                                    min="5" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': err.location
                                    })}
                                    name="address"
                                    value={this.state.location}
                                    onChange={this.onChange} 
                                />
                                {err.location && (<div className="invalid-feedback">{err.location}</div>)}
                            </div>

                            <div className="col-sm-12 col-md-4"> 
                                <label htmlFor="text">City</label>
                                <select
                                    name="city"
                                    value={this.state.selectValue}
                                    onChange={this.handleChangeCity}
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': err.city
                                    })}
                                >
                                    <option value="">City</option>
                                    <option value="Manhattan">Manhattan</option>
                                    <option value="Queens">Queens</option>
                                    <option value="Bronx">Bronx</option>
                                    <option value="Brooklyn">Brooklyn</option>
                                    <option value="Staten Island">Staten Island</option>
                                </select>
                                {err.city && (<div className="invalid-feedback">{err.city}</div>)}
                            </div>
                            
                        </div>
                        


                        <div className="form-group">
                            <label htmlFor="text">Item Description</label>
                            <textarea 
                                type="text" 
                                id="description" 
                                min="5" 
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': err.description
                                })}
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange} 
                                id="description" 
                                rows="3">
                            </textarea>
                            {err.description && (<div className="invalid-feedback">{err.description}</div>)}
                        </div>
                        

                        
                        <div className="form-group">
                            <label htmlFor="text">Author</label>
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': err.author
                                })}
                                name="author"
                                value={this.state.author}
                                onChange={this.onChange} 
                            />
                            {err.author && (<div className="invalid-feedback">{err.author}</div>)}
                        </div>


                        <input type="submit" className="btn btn-info btn-block mt-4" />
                      </form>
                    </div>
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


export default connect(mapStateToProps, {postDeal})(AddDealAsGuest);


