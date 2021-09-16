import BaseService from '../services/base.service';
const dotenv = require('dotenv');

dotenv.config();

const GetJobs = async () => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/jobs`);
        return (response);
    } catch (error) {
        return error;
    };
}

const GetJobById = async (id) => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/job/${id}`);
        return (response);
    } catch (error) {
        return error;
    };
}

const GetJobByUserId = async (userId) => {
    try {
        const response = await BaseService.getAuthorizationClient().get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/job/user/${userId}`);
        return (response);
    } catch (error) {
        return error;
    };
}

const PostJob = async (data) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/add/job`, data);
        return (response);
    } catch (error) {
        return error;
    }
}

const EditJobService = async (id, data) => {
    try {
        const response = await BaseService.getAuthorizationClient().post(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/job/${id}`, data);
        return (response);
    } catch (error) {
        return error;
    }
}

const DeleteJob = async (userId, jobId) => {
    try {
        const response = await BaseService.getAuthorizationClient().delete(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/delete/${jobId}/${userId}`);
        return (response);
    } catch (error) {
        return error;
    }
}

export {
    GetJobs,
    PostJob,
    GetJobById,
    GetJobByUserId,
    DeleteJob,
    EditJobService
}