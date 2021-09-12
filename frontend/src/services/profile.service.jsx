import BaseService from '../services/base.service';
const dotenv = require('dotenv');

dotenv.config();

const GetProfileService = async (id) => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/profile/${id}`);
        return (response.data.ResponseData);
    } catch (error) {
        return error;
    }
}

const EditProfileService = async (formData, userId) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/profile/${userId}`, formData);
        return (response.data.ResponseMessage);
    } catch (error) {
        return error;
    }
}

export {
    EditProfileService,
    GetProfileService
}