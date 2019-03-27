import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    }
    render(){
        const { err } = this.state;
        const { userData } = this.props.auth;
        
        return(
            <div className="container text-center">
                <h1>Edit Profile</h1>
            </div>        
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {getUser})(UserProfile);
