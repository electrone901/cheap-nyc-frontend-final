
import axios from 'axios';

let serverURL = 'https://cnycserver.herokuapp.com/';

if(process.env.NODE_ENV === 'production'){
    serverURL = 'https://cnycserver.herokuapp.com/';
}

const instance = axios.create({
   baseURL: serverURL
});

export default instance;