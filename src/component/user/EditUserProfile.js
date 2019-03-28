import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getUser } from '../../actions/authActions';

class UserProfile extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            image: null,
            imageName: 'Choose file',
            err: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        const userId = this.props.match.params.id;
        
        this.props.getUser(userId);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        if(nextProps.auth.userData){
            const { userData } = nextProps.auth;
            
            userData.name = userData.name ? userData.name : '';
            
            this.setState({
                name: userData.name
            });
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    fileSelectedHandler = e => {
        if(e.target.files[0]){
            this.setState({ image: e.target.files[0] });
            this.setState({ imageName: e.target.files[0].name });
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        console.log(this.state.name);
    }
    render(){
        const { err } = this.state;
        const { userData } = this.props.auth;
        
        return(
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Edit Profile</h1>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Your Name</label>
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
                    <input type="submit" className="btn btn-info btn-block mt-4" />
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

export default connect(mapStateToProps, {getUser})(UserProfile);
