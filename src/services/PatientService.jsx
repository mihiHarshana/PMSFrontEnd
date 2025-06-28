import axios from "axios";
import API_BASE_URL from './Constance.jsx';

const REST_API_BASE_URL = API_BASE_URL+'/patient';


export const getthis = () => {
    return axios.get(REST_API_BASE_URL);
}

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createPatient = (patient) => axios.post(REST_API_BASE_URL + '/register', patient ,authHeader());

export const getPatientByName = (name) => axios.post(REST_API_BASE_URL + '/getbyname',   name ,authHeader(), );

export const updatePatient = (patient) => axios.put(REST_API_BASE_URL + '/update', patient , authHeader());

export const getPatientById = (patient) => axios.post(REST_API_BASE_URL + '/getbypid' , patient  , authHeader());


//export const userAuthentication = (user) => axios.post(REST_API_BASE_URL, user);