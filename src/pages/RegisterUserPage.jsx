import Header from '../components/Header';
import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { createUser, getUserByUserName } from '../services/UserService';

export const RegisterUser = ({ loggedInUser }) => {

const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [retypePw, setReTypePw] = useState("");
const [userType, setUserType] = useState("");
const [userId, setUserId] = useState('');
const [userExists, setUserExists] = useState(false);
const [userNotExists, setUSerNotExists] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [userMessage, setMessage] = useState("");

  const [errors, setErrors] = useState({
    errorUserName: '',
    errorPassword:'',
    errorRePassword: '',
    errorUserType: ''
  })

function handleUserSearchButton(e) {
  e.preventDefault();

  if (!userName || userName.trim() === "") {
    setErrorMessage("Please enter a valid user name.");
    return;
  }

  const userPayload = {
    userName: userName.trim()
  };

  // Call API to check if user exists
  getUserByUserName(userPayload)
    .then((response) => {
      const userData = response.data;

      if (!userData || Object.keys(userData).length === 0) {
        // User does not exist, allow registration
        setUserExists(false);
        setUSerNotExists(true);
        setUserId("");
        setPassword("");
        setUserType("");
        setUserType(0);
        setErrorMessage("User not found. Please register.");
      } else {
        // User exists — fill in details
        setUserExists(true);
        setUSerNotExists(false)
        setUserId(userData.id);
        setPassword(userData.userPassword);
        setReTypePw(userData.userPassword);
        setUserType(userData.userType);
        setErrorMessage(""); // Clear error
      }
    })
    .catch((error) => {
if (error.response && error.response.status === 404) {
      //console.warn('User not found');
      setUserExists(false);
      setErrorMessage('User not found'); // Optional: show message on UI
    } else {

      console.error("Error fetching user:", error);
      setErrorMessage("Something went wrong while searching for the user.");
    }
    });
}

  function handleOnChangeUserName (e) {
    setUserName(e.target.value);
  }

  function handOnChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleOnChangeReTypePasswod(e) {
    setReTypePw(e.target.value);
  }

  function handleOnChangeUserType(e) {
    setUserType(e.target.value)
  }

  function handleClearButton() {
    clear();
  }

  function formValidation () {

    let valid = true;
    const errorsCopy = {...errors}

    if (userName.trim()) {
      errorsCopy.errorUserName ='';
    } else {
      errorsCopy.errorUserName = 'Enter User First Name';
      valid = false;
    }

    if (retypePw && password && retypePw !== password) {
      errorsCopy.errorRePassword = 'Passwords do not match';
      errorsCopy.errorPassword ='Password do not match'
      valid = false;
    }

if (!userType || userType === "0") {
  errorsCopy.errorUserType = 'Select a user type';
  valid = false;
} else {
  errorsCopy.errorUserType = '';
}
    setErrors(errorsCopy)
    return valid;
  }

  function handleUserRegisterUpdateButton(e){
    e.preventDefault();

    if (formValidation () ) {
  if (userExists) {

      const User = {
         "id": userId,
        "userName" : userName,
        "userPassword" : password,
        "userType": userType
      }
          createUser (User).then((response) => {
          console.log(response.data);
            setMessage("User Details updated.");
            setTimeout(() => {
              clear();
            }, 2000); // 2000 milliseconds = 2 seconds
  
       
      
            }).catch(error => {
                console.error(error);
            })
      //Update flow

    } else {
      // New User Registraion flow

      const User = {
        "userName" : userName,
        "userPassword" : password,
        "userType": userType
      }

      createUser (User).then((response) => {
        console.log(response.data);
        setMessage("User Registration completed.");

        setTimeout(() => {
              clear();
            }, 2000); //
    

      }).catch(error => {
        console.error(error);
      })
    }
    } 
  }

  function clear() {
    setUserName("");
    setPassword("");
    setReTypePw("");
    setUserType(0);
    setUserExists(false);
    setUSerNotExists(false)
    setErrors('');
    setMessage('');
    }

  return (
    <>
      <Header loggedInUser={loggedInUser} />

      {/* Full viewport container to center content */}
    <Container
      fluid
      className="d-flex justify-content-center align-items-start pt-md-5 pt-3"
      style={{ minHeight: '100vh', paddingTop: '60px' }}  // Adjust paddingTop as you want
    >
        {/* Form card with padding, border, shadow */}
        <div className="p-4 bg-white rounded shadow" style={{ minWidth: '320px', maxWidth: '480px', width: '100%' }}>
          <Form>
            <Row className="mb-3 align-items-end">
              <Col xs={8}>
                <Form.Group controlId="fromUsrId">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter User Name" 
                    value={userName}  
                    onChange={handleOnChangeUserName}
                    className={`form-control ${errors.errorUserName ? 'is-invalid' : ''}`}/>
                                      {errors.errorUserName && <div className='invalid-feedback'>{errors.errorUserName}</div>}
                
                    {userExists ?  <span className='text-success'>User already exists</span> : <div></div> }
                    {userNotExists ? <span className='text-success'>Valid user name, continue with registration</span> : <div></div>}
                </Form.Group>
              </Col>
              <Col xs={4} className="d-grid">
                <Button variant="outline-primary" onClick={handleUserSearchButton}>
                  <Search />
                </Button>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group controlId="fromPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    value = {password} 
                    onChange={handOnChangePassword} 
                    className={`form-control ${errors.errorPassword ? 'is-invalid' : ''}`}/>
                              {errors.errorPassword && <div className='invalid-feedback'>{errors.errorPassword}</div>}
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="fromretypePassword">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control type="password"
                   placeholder="Retype Password"
                  value = {retypePw}
                  onChange={handleOnChangeReTypePasswod}
                   className={`form-control ${errors.errorRePassword ? 'is-invalid' : ''}`}/>
                            {errors.errorRePassword && <div className='invalid-feedback'>{errors.errorRePassword}</div>}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Select aria-label="User Type"
                  value={userType}
                  onChange={handleOnChangeUserType}
                  className={`form-control ${errors.errorUserType ? 'is-invalid' : ''}`}
                              
                >
                   {errors.errorUserType && <div className='invalid-feedback'>{errors.errorUserType}</div>}
                  <option value="0">Select User Type</option>
                  <option value="1">ADMIN</option>
                  <option value="2">DOCTOR</option>
                  <option value="3">USER</option>
     
                </Form.Select>
              </Col>
            </Row>
                 {  (userMessage)  ? <span className='text-success'> {userMessage}</span> : <span></span>}
            <Row>
              <Col className="d-flex justify-content-start">
                <Button variant="primary" type="submit"
                  onClick={handleUserRegisterUpdateButton}
                >
                   {userExists ? "Update" : "Register" }
                </Button>
                <Button variant="secondary" 
                    className="ms-3" 
                    onClick={handleClearButton}
                >
                  Clear
                </Button>

           
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}