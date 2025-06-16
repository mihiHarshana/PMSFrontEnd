import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/patient';


export const getthis = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createPatient = (patient) => axios.post(REST_API_BASE_URL + '/register', patient);

export const getPatientByName = (name) => axios.post(REST_API_BASE_URL + '/getbyname', name);

export const updatePatient = (patient) => axios.put(REST_API_BASE_URL + '/update', patient);

export const getPatientById = (patient) => axios.post(REST_API_BASE_URL + '/getbypid', patient);


//export const userAuthentication = (user) => axios.post(REST_API_BASE_URL, user);