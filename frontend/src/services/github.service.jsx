import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const FetchGithubProfile = async (githubId) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_GITHUB_API_URL}/users/${githubId}`);
        return (response);
    } catch(error){
        return (error);
    }
}

const FetchGitHubProjects = async (githubId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GITHUB_API_URL}/users/${githubId}/repos`);
        return (response);
    } catch (error) {
        return (error);
    }
}



export {
    FetchGitHubProjects,
    FetchGithubProfile
}