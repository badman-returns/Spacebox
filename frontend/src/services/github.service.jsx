import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const FetchGitHubProjects = async (repoURL) => {
    try {
        const response = await axios.get(`${repoURL}`,);
        return (response.data);
    } catch (error) {
        return (error);
    }
}



export {
    FetchGitHubProjects,
}