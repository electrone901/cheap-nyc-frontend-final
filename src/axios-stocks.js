
import axios from 'axios';

let serverURL = 'http://localhost:5000';

if(process.env.NODE_ENV === 'production'){
    serverURL = 'https://cnycserver.herokuapp.com/';
}

const instance = axios.create({
   baseURL: serverURL
});

export default instance;