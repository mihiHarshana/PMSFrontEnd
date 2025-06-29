import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {createPatient, getPatientByName , updatePatient} from  '../services/PatientService';
import { Col, Row } from 'react-bootstrap';

export const PatientRegistrationPage = ({loggedInUser}) => {

  const [showPopup, setShowPopup] = useState(false);
  const [patientExists, setPatientExists] = useState(false);
  
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [pid, setPId] = useState('');
  const [pFirstName, setPFirstName] = useState('')
  const [pLastName, setPLastName] = useState('')
  const [pAddress, setpAddress] = useState('')
  const [pTelNo, setPTelNo] = useState('') 
  const [pEmail, setPEmail] = useState('')
  const [pGender, setPGender] = useState('')
  const [pDob, setPDob] = useState('')
  const [pStatus, setPStatus] = useState(true);

  const navigator = useNavigate();  
  const [errorMessage, setErrorMessage] = useState('')

  const [errors, setErrors] = useState({
    pFirstName: '',
    pLastName: '',
    pAddress: '',
    pTelNo: '',
    pEmail: '',
    pGender: '',
    pDob: ''
    
  })
     // const [authError, setAuthError] = useState('');

  function handlePFirstName(e) {
    setPFirstName(e.target.value);
  }

  function handlePLastName(e) {
    setPLastName(e.target.value);
  }

  function handPAddress(e) {
    setpAddress(e.target.value);
  }

  function handlePTelNo(e) {
    setPTelNo(e.target.value);
  }

  function handlePEmail(e) {
    setPEmail(e.target.value);
  }

  function handlePGender(e){
    setPGender(e.target.value);
  }

  function handlePDOB(e){
    setPDob(e.target.value);
  }

  function handlePStatus(e) {
    setPStatus(e.target.value)
  }

  function handleSearchButton (e) {
    e.preventDefault();
    clearFields();
    const patient = {
      "pfirstName": pFirstName
    }

    getPatientByName(patient) .then((response) => {
        if (!response.data || response.data.length === 0) {
          console.error("No patient data found.");
          setPatientExists(false);
      // You can also display an error message in the UI here, for example:
          setErrorMessage("No patient data found.");  // Assuming setErrorMessage is defined in your component
        return; // Stop execution if no data is available
      }
      setErrorMessage('');
      setPatientExists(true)
      console.log(response.data[0]);
      const patientData = response.data[0];
      console.log(patientData.pfirstName);
      setPId(patientData.id);
      setPFirstName(patientData.pfirstName);
      setPLastName(patientData.plastName);
      setPDob(patientData.pdob);
      setPEmail(patientData.pemail);
      setPTelNo(patientData.ptelNo);
      setPGender(patientData.pgender);
      setpAddress(patientData.paddress);
      setPStatus(patientData.pstatus);
    })
    .catch(error => {
      console.error(error);
    });
  } // search button 

  function handleClearButton (e) {
    e.preventDefault();
    setPFirstName('');
    clearFields();
  }

  function clearFields () {
    setPLastName('');
    setPDob('');
    setPEmail('');
    setPGender('');
    setPStatus('');
    setPTelNo('');
    setpAddress('');
    setErrorMessage('');
    setErrors('');
  }

  function handleRegisterUpdateButton(e) {
    e.preventDefault();
    if (validateForm() ) {
        // const patient = {pFirstName,pLastName,pAddress,pTelNo,pEmail,pGender,pDob,pStatus};
      const patient = {
        "id":pid,
        "pfirstName": pFirstName,
        "plastName": pLastName,
        "paddress": pAddress,
        "ptelNo": pTelNo,
        "pemail": pEmail,
        "pgender": pGender,
        "pdob" : pDob,
        "pstatus": pStatus
      }
        
      console.log("priting patient : " + patient)
      if (patientExists) {
        updatePatient (patient).then((response) => {
        console.log(response.data);

      }).catch(error => {
          console.error(error);
      })

      } else {
        createPatient (patient).then((response) => {
        console.log(response.data);

      }).catch(error => {
          console.error(error);
        })
      } //end of if
      
    }
  } // End of registerButton

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors}

        if (pFirstName.trim()) {
          errorsCopy.pFirstName ='';
        } else {
          errorsCopy.pFirstName = 'Enter Patien\'s First Name';
          valid = false;
        }
        if (pLastName.trim()) {
          errorsCopy.pLastName ='';
        } else {
          errorsCopy.pLastName = 'Enter Patien\'s Last Name';
          valid = false;
        }

        if (pAddress.trim()) {
          errorsCopy.pAddress ='';
        } else {
          errorsCopy.pAddress = 'Enter Patien\'s Address';
          valid = false;
        }

        if (pTelNo.trim()) {
          errorsCopy.pTelNo ='';
        } else {
          errorsCopy.pTelNo = 'Enter Patien\'s Telephone number';
          valid = false;
        }
        if (pEmail.trim()) {
          errorsCopy.pEmail ='';
        } else {
          errorsCopy.pEmail = 'Enter Patien\'s Email';
          valid = false;
        }
        if (pGender != '') {
          errorsCopy.pGender ='';
        } else {
          errorsCopy.pGender = 'Enter Patien\'s Gender';
          valid = false;
        }
        if (pDob.trim()) {
          errorsCopy.pDob ='';
        } else {
          errorsCopy.pDob = 'Enter Patien\'s DOB';
          valid = false;
        }
        

        setErrors(errorsCopy)
        return valid;
      }

        const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setShowPopup(false);
    console.log('Selected patient:', patient);
  };

  return (
    <>
    <Header loggedInUser={loggedInUser} />
 <div className='container'>
  <div className='row'>
              
  <div className='card col-md-6 offset-md3 offset-md-3 '>
    <br />
    <br /> <br />
      <Form>
                
        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {errorMessage}
          </div>
        )}
        <Row>
          <Col>
                  <Form.Group className="mb-3 " controlId="formPatientFirstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter Patient First Name" value={pFirstName} onChange={handlePFirstName} 
          className={`form-control ${errors.pFirstName ? 'is-invalid' : ''}`}/>
          {errors.pFirstName && <div className='invalid-feedback'>{errors.pFirstName}</div>}
        </Form.Group>
          </Col>

          <Col>
        <Form.Group className="mb-3 " controlId="formPatientLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient Last Name" value={pLastName} onChange={handlePLastName} 
                    className={`form-control ${errors.pLastName ? 'is-invalid' : ''}`}/>
                                      {errors.pLastName && <div className='invalid-feedback'>{errors.pLastName}</div>}
        </Form.Group>

          </Col>

        </Row>

        <Row>
          <Col>
        <Form.Group className="mb-3 " controlId="formPatientAddress">
          <Form.Label>Address :</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient Address" value={pAddress} onChange={handPAddress} 
                    className={`form-control ${errors.pAddress ? 'is-invalid' : ''}`}/>
                                      {errors.pAddress && <div className='invalid-feedback'>{errors.pAddress}</div>}
        </Form.Group>
          </Col>
          <Col>
        <Form.Group className="mb-3 " controlId="formPatientTelNo">
          <Form.Label>Telephone No :</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient Telphone No" value={pTelNo} onChange={handlePTelNo} 
                    className={`form-control ${errors.pTelNo ? 'is-invalid' : ''}`}/>
                                      {errors.pTelNo && <div className='invalid-feedback'>{errors.pTelNo}</div>}
        </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
        <Form.Group className="mb-3 " controlId="formPatientEmail">
          <Form.Label>Email :</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient Email" value={pEmail} onChange={handlePEmail} 
                    className={`form-control ${errors.pEmail ? 'is-invalid' : ''}`}/>
                                      {errors.pEmail && <div className='invalid-feedback'>{errors.pEmail}</div>}
        </Form.Group>
          </Col>
    <Col>
      <Form.Group className="mb-3" controlId="formPatientGender">
        <Form.Label>Gender :</Form.Label>
        <Form.Select
          value={pGender}
          onChange={handlePGender}
          className={`form-control ${errors.pGender ? 'is-invalid' : ''}`}
        >
          <option value="">Select Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="0">Other</option>
        </Form.Select>
        {errors.pGender && <div className="invalid-feedback">{errors.pGender}</div>}
      </Form.Group>
    </Col>
        </Row>
        <Row>
          <Col>
        <Form.Group className="mb-3 " controlId="formPatientDOB">
          <Form.Label>DOB :</Form.Label>
          <Form.Control type="text" placeholder="Enter Patient DOBr" value={pDob} onChange={handlePDOB} 
                    className={`form-control ${errors.pDob ? 'is-invalid' : ''}`}/>
                                      {errors.pDob && <div className='invalid-feedback'>{errors.pDob}</div>}
        </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formPatientStatus">
              <Form.Check 
                type="checkbox"
                label="Active"
                checked={pStatus} // boolean state
                onChange={(e) => setPStatus(e.target.checked)} // update boolean value
                isInvalid={!!errors.pStatus}
              />
              {errors.pStatus && (
                <div className="invalid-feedback d-block">
                  {errors.pStatus}
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button className='me-2' variant="primary" onClick={handleRegisterUpdateButton}>
                    {patientExists ? "Update" : "Register"}
            </Button>
            <Button className='me-2' variant="primary" onClick={handleSearchButton}>
                    Search
            </Button>

            <Button className='me-2' variant="primary" onClick={handleClearButton}>
                    Clear
            </Button>
          </Col>

        </Row>
 
        <br />





  
       
      </Form>
      <br /><br />
    </div>
  </div>

  {selectedPatient && (
        <div>
          <h3>Selected Patient:</h3>
          <p>{selectedPatient.pFirstName} {selectedPatient.pLastName}</p>
        </div>
  )}

</div>
</>

)}
