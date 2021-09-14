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

const VerifyEmailandActivateUser = async (data) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/verify-email/${data.userId}/${data.token}`);
        return (response);
    } catch (error) {
        console.log(error);
        return (error);
    }
}

export {
    RegistrationService,
    VerifyEmailandActivateUser
}