import axios from "axios";
const dotenv = require('dotenv');

dotenv.config();

class BaseService {

  getAuthorizationClient = () => axios.create(
    {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem('token')}`
      }
    });
    
  login = (username, password) => {
    return axios
      .get(`${process.env.REACT_APP_BASE_BACKEND_API_URL}/user/authentication`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((respone) => {
        const token = respone.headers["authorization"];
        sessionStorage.setItem("token", token);
        if (token) {
          sessionStorage.setItem("user", JSON.stringify(respone.data));
        }
        return respone;
      });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('token') != null){
        sessionStorage.clear();
        this.isLoggedIn = false;
        return resolve(true);
      }
      return reject(true);
    })
  }
}

export default new BaseService();
