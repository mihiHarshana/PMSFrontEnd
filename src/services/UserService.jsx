import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users/login';

export const getthis = () => {
    return axios.get(REST_API_BASE_URL);
}

export const creatEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const userAuthentication = (user) => axios.post(REST_API_BASE_URL, user);