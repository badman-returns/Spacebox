import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const RegistrationService = async (registrationData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/register`, registrationData);
        return (response);
    } catch (error) {
        return error;
    };
}

const LoginService = async (email, password) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/authentication`,
        {
            auth: {
                username: email,
                password: password, 
            },
        });
        const token = response.headers['authorization'];
        sessionStorage.setItem('token', token);
        if (token){
            sessionStorage.setItem('user', JSON.stringify(response.data));
        }
        return (response.data);
    } catch (error) {
        return (error);
    }
}

export {
    RegistrationService,
    LoginService
}