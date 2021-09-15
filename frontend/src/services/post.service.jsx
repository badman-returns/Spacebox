import BaseService from '../services/base.service';
const dotenv = require('dotenv');

dotenv.config();

const createPost = async (formData) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/add/post`, formData)
        return (response);
    } catch (error) {
        return (error);
    }
}

const GetPost = async () => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/post`);
        return (response);
    } catch (error) {
        return error;
    };
}

const GetPostByUserId = async (userId) => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/post/`, { id: userId });
        return (response);
    } catch (error) {
        return error;
    }
}

const EditPostById = async (id, formData) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/post/${id}`, formData);
        return (response);
    } catch (error) {
        return error;
    }
}

const DeletePostById = async (data) => {
    try {
        const response = await BaseService.getAuthorizationClient().delete(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/post/${data.id}`, {data});
        return (response);
    } catch (error) {
        return error;
    }
}

export {
    GetPost,
    createPost,
    GetPostByUserId,
    DeletePostById,
    EditPostById
}