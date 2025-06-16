

import Form from 'react-bootstrap/Form';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { useState , useEffect } from "react";
import { getPatientByName, getPatientById} from  '../services/PatientService';
import {Link, useNavigate } from 'react-router-dom';


export const PatientComponent = ({setPatientId, setClearTrigger}) => {

  const navigator = useNavigate();  
  function handlePatientRegistration() {
      <Link to="/registerpatient"></Link>
}


  const [pid, setPId] = useState('');
  const [pFirstName, setPFirstName] = useState('');

  const [patInfoId, setPatInfoId] = useState('');
  const [patInfoFirstName, setPatInfoFirstName] = useState('');
  const [patInfoLastName, setPatInfoLastName] = useState('');
  const [patInfoAge, setPatInfoAge] = useState('');
  const [patInfoAddress, setPatInfoAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 // const [prescriptions, setPrescriptions] = useState([]);

  const [errors, setErrors] = useState({
    pId: '',
    pFirstName: ''
  })


  function handleSearchButton(e) { 
    e.preventDefault();
    if (validateForm() ) {
      if (pFirstName !== '') {
          const patient = {
          "pfirstName": pFirstName
          }
         getPatientByName(patient).then((response) => {
          if (!response.data || response.data.length === 0) {
            console.error("No patient data found.");
            setErrorMessage("Patient does not exists.");
            clearFields();
        // You can also display an error message in the UI here, for example:
           // setErrorMessage("No patient data found.");  // Assuming setErrorMessage is defined in your component
          return; // Stop execution if no data is available
          }
          const resPatData = response.data[0];
          setPatInfoFirstName(resPatData.pfirstName);
          setPatInfoLastName(resPatData.plastName);
          setPatInfoAge(resPatData.pdob);
          setPatInfoAddress(resPatData.paddress);
          setPatInfoId(resPatData.id);
          setPatientId(resPatData.id);

          setErrorMessage('');
        })
        .catch(error => {
          console.error(error);
        });

      } else {
          const patient = {
          "id": pid
          }
          getPatientById(patient).then((response) => {
          if (!response.data || response.data.length === 0) {
            console.error("No patient data found.");
            setErrorMessage("Patient does not exists.");
            clearFields();

        // You can also display an error message in the UI here, for example:
           // setErrorMessage("No patient data found.");  // Assuming setErrorMessage is defined in your component
          return; // Stop execution if no data is available
         }

          const resPatData = response.data;
          console.log("*** patietn id " + resPatData.id);

          console.log(resPatData);
          setPatInfoFirstName(resPatData.pfirstName);
          setPatInfoLastName(resPatData.plastName);
          setPatInfoAge(resPatData.pdob);
          setPatInfoAddress(resPatData.paddress);
          setPatInfoId(resPatData.id);
          setPatientId(resPatData.id);

          setErrorMessage('');

        })
        .catch(error => {
          console.error(error);
        });

          // setPrescriptions
          // here going to load the patient prescritions using the patient id. some how needs to wait till the patient id is fetched.

      }
    }
  }

  function handleClearButton(e) {
    e.preventDefault();
    setErrorMessage('');
    clearFields();


  }

  function clearFields() {
    setPatInfoFirstName('');
    setPatInfoLastName('');
    setPatInfoAge('');
    setPatInfoAddress('');
    setPatInfoId('');
    setPId('');
    setPFirstName('');
    
    setPatientId(null);
    setClearTrigger(true);
  }


  function handlePFirstName(e) {
    setPFirstName(e.target.value);
  }

  function handlePid(e) {
    setPId(e.target.value);
  }

function validateForm() {
  const errorsCopy = { ...errors };
  let isValid = true;

  if (!pFirstName.trim() && !pid.trim()) {
    const errorMsg = "Enter Patient's First Name or ID to search";
    errorsCopy.pFirstName = errorMsg;
    errorsCopy.pId = errorMsg;
    isValid = false;
  } else {
    // Clear previous errors
    errorsCopy.pFirstName = '';
    errorsCopy.pId = '';
  }

  setErrors(errorsCopy);
  return isValid;
}

  return (
    <>
      <Row>   {/* patient ifnrmaton hadanne------------------------------------------- */}

        <div className="d-flex justify-content-around">
          <Card style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title>Patient Information</Card.Title>
              <Card.Text>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formPatientFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Patient First Name"
                          value={pFirstName}
                          onChange={handlePFirstName}
                          className={`form-control ${errors.pFirstName ? 'is-invalid' : ''}`}
                        />
                        {errors.pFirstName && <div className="invalid-feedback">{errors.pFirstName}</div>}
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3" controlId="formPatientId">
                        <Form.Label>Patient ID:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Patient ID"
                          value={pid}
                          onChange={handlePid}
                          className={`form-control ${errors.pId ? 'is-invalid' : ''}`}
                        />
                        {errors.pId && <div className="invalid-feedback">{errors.pId}</div>}
                      </Form.Group>
                    </Col>

                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <Col xs="auto" className="d-flex justify-content-end align-items-end">
                      <div>
                        <Button className="me-2" variant="primary" onClick={handleSearchButton}>
                          Search
                        </Button>
                        <Button variant="secondary" onClick={handleClearButton}>
                          Clear
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '50%' }}> {/* Patient Details ......  */}
            <Card.Body>
              <Card.Title>Patient Details</Card.Title>
              <Card.Text>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name : {patInfoFirstName + " " + patInfoLastName} </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>ID : {patInfoId}</Form.Label>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Age : {patInfoAge}</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Address : {patInfoAddress}</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </>
  )
}
