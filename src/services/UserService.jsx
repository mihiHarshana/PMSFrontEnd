import axios from "axios";
import API_BASE_URL from './Constance.jsx';

const REST_API_BASE_URL = API_BASE_URL+'/users';

export const getthis = () => {
    return axios.get(REST_API_BASE_URL);
}

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const creatEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const userAuthentication = (user) => axios.post(REST_API_BASE_URL+'/login', user);

export const createUser = (user) => axios.post(REST_API_BASE_URL+'/createUser', user, authHeader())

export const getUserByUserName = (user) => axios.post(REST_API_BASE_URL+'/searchUserByUserName', user , authHeader());
