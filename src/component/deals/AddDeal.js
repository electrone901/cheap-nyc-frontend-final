import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// import { loginUser } from '../../actions/authActions';

class AddDeal extends Component{
    constructor(){
        super();
        this.state = {
            company: '',
            name: '',
            price: 0,
            category: '',
            image: null,
            imageName: 'Choose file',
            address: '',
            city: '',
            description: '',
            author: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    
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
    
    // allows to append data to obj
    
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

        console.log('formData', formData);

        let url = 'https://cnycserver.herokuapp.com/items';
        let method = 'POST';

        fetch(url, {
            method: method,
            body: formData
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(resData => {
             console.log(resData);
             this.props.history.push('/');
        })
        .catch(err => {
            console.log("error: " + err);
        });
    }
    
    
    render(){
        const {errors} = this.state;
        
        return(
            <div className="login">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Create a post</h1>
                      <form onSubmit={this.onSubmit}>
                        
                        <div className="form-group">
                            <label htmlFor="text">Company name</label>
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg', {
                                    'is-text': errors.name
                                })}
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange} 
                            />
                            {errors.company && (<div className="invalid-feedback">{errors.company}</div>)}
                        </div>

                        <div className="form-group row"> 
                            <div className="col-md-8">
                                <label htmlFor="text">Item name</label>
                                <input
                                    type="text"
                                    className={classnames('form-control form-control-lg', {
                                        'is-text': errors.name
                                    })}
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange} 
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>

                            <div className="form-group col-sm-12 col-md-4">
                                <div className="dropdown dropdown-padding-bottom col-sm-12">
                                    <select
                                    value={this.state.selectValue}
                                    onChange={this.handleChangeCategory}
                                    className="btn btn-outline-primary dropdown-toggle col-sm-12"
                                    
                                >
                                    <option value=" ">Category</option>
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
                                
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Item price</label>
                            <input
                                type="number" 
                                id="price" 
                                min="0" 
                                className={classnames('form-control form-control-lg', {
                                    'is-text': errors.price
                                })}
                                name="price"
                                value={this.state.price}
                                onChange={this.onChange} 
                            />
                            {errors.price && (<div className="invalid-feedback">{errors.price}</div>)}
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Upload an image (Optional but recommended)</label>
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
                                <label htmlFor="text">Address</label>
                                <input
                                    type="text" 
                                    id="address" 
                                    min="5" 
                                    className={classnames('form-control form-control-lg', {
                                        'is-text': errors.address
                                    })}
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChange} 
                                />
                                {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                            </div>

                            <div className="form-group col-sm-12 col-md-4">
                                <div className="dropdown dropdown-padding-bottom col-sm-12">
                                    <select
                                    value={this.state.selectValue}
                                    onChange={this.handleChangeCity}
                                    className="btn btn-outline-primary dropdown-toggle col-sm-12"
                                    
                                >
                                    <option value=" ">City</option>
                                    <option value="Manhattan">Manhattan</option>
                                    <option value="Queens">Queens</option>
                                    <option value="Bronx">Bronx</option>
                                    <option value="Brooklyn">Brooklyn</option>
                                    <option value="Staten Island">Staten Island</option>

                                </select>
                                
                                </div>
                            </div>
                        </div>
                        

                        <div className="form-group">
                            <label htmlFor="text">Item Description</label>
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
                        </div>
                        
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

export default AddDeal;