import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const forgetPassword = async (email) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/forget-password`, { email: email });
        return (response);
    } catch (error) {
        return error;
    }
}


const verifyResetToken = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/verify-reset-token/${data.userId}/${data.token}`);
        return (response);
    }
    catch (error) {
        console.log(error);
        return [];
    }
}


const resetPassword = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/reset-password`, data);
        return (response);

    } catch (error) {
        return (error);
    }
}

export {
    forgetPassword,
    verifyResetToken,
    resetPassword
}