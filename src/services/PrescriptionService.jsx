import axios from "axios";
import API_BASE_URL from './Constance.jsx';

const REST_API_BASE_URL = API_BASE_URL+'/prescription';

axios.defaults.withCredentials = true;
export const getthis = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createPrescription = (Prescription) => axios.post(REST_API_BASE_URL + '/register' ,   Prescription );

export const getPrescriptionByPatientId = (Prescription) => axios.post(REST_API_BASE_URL + '/getPrescritionByPatientId', Prescription );

//export const getPatientByName = (name) => axios.post(REST_API_BASE_URL + '/getbyname', name);

//export const updatePatient = (patient) => axios.put(REST_API_BASE_URL + '/update', patient);

//export const getPatientById = (patient) => axios.post(REST_API_BASE_URL + '/getbypid', patient);


//export const userAuthentication = (user) => axios.post(REST_API_BASE_URL, user);