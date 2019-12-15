// Contains a function that takes a token, if the token is there, then its gonna add it to the headers, if not
// its gonna delete it from the headers.
import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
