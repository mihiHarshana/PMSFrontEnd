
import { PatientComponent } from "../components/PatientComponent";
import Header from '../components/Header';
import { PresCriptionComponent } from '../components/PrescriptionComponent';
import { useState } from "react";

export const PrescriptionPage = ({ loggedInUser }) => {

const [patientId, setPatientId] = useState(null);
const [clearTrigger, setClearTrigger] = useState(false);

 
return (
    <>
      <Header loggedInUser={loggedInUser} />
      <PatientComponent  setPatientId={setPatientId} setClearTrigger={setClearTrigger}/>  
      <PresCriptionComponent 
              patientId={patientId}   
              clearTrigger={clearTrigger} 
              setClearTrigger={setClearTrigger}
              
              />
     
    </>
  )
}
