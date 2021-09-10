import BaseService from '../services/base.service';
const dotenv = require('dotenv');

dotenv.config();

const createPost = async (formData) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/add/post`, formData)
        return (response.data);
    } catch (error) {
        return (error);
    }
}

const GetPost = async () => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/post`);
        return (response.data.ResponseData);
    } catch (error) {
        return error;
    };
}

export {
    GetPost,
    createPost
}