    import { useState } from 'react'
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import {useNavigate } from 'react-router-dom';
    import {userAuthentication} from  '../services/UserService';
   

    export const LoginPage = ({setLoggedInUser}) => {

      const [userName, setUserName] = useState('')
      const [userPassword, setUserPassword] = useState('')
      const [token, setToken] = useState("");

      const navigator = useNavigate();  

      const [errors, setErrors] = useState({
        userName: '',
        userPassword: ''
      })
      const [authError, setAuthError] = useState('');

        function handleUserName(e) {
        setUserName(e.target.value);
      }

      function handlePassword(e) {
        setUserPassword(e.target.value)
      }

      function handleLoginButton(e) { 
      e.preventDefault();
    if (validateForm()) {
        const user = { userName, userPassword };

        userAuthentication(user)
          .then((response) => {
            console.log(response.data);
            const logeduser = response.data.loginRequest
            setToken(response.data.token);
            setLoggedInUser(logeduser);
            localStorage.setItem("token", response.data.token);
            console.log(localStorage.getItem("token"));
            navigator('/home');
          })
          .catch((error) => {
          setAuthError('Invalid username or password. Please try again.'); 
          });
      } else {
          console.log('Nothing to do ');
        }

      }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors}

        if (userName.trim()) {
          errorsCopy.userName ='';
        } else {
          errorsCopy.userName = 'user name is required';
          valid = false;
        }
        if (userPassword.trim()) {
          errorsCopy.userPassword ='';
        } else {
          errorsCopy.userPassword = 'Password is required';
          valid = false;
        }
        setErrors(errorsCopy)
        return valid;
      }

      return (
        <div className='container'>
            <div className='row'>
              
            <div className='card col-md-6 offset-md3 offset-md-3 '>
                <br />
                <h2 className="card-title">Prescription Management System</h2>
                <h4 className="card-title">Nugegoda Aurvedic Clinic</h4>
                <br /> <br />
                <Form>
                <Form.Group className="mb-3 " controlId="formBasiUserName">
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter User name" value={userName} onChange={handleUserName} 
                    className={`form-control ${errors.userName ? 'is-invalid' : ''}`}/>
                                      {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={userPassword} onChange={handlePassword} 
                    className={`form-control ${errors.userPassword ? 'is-invalid' : ''}`}/>
                                      {errors.userPassword && <div className='invalid-feedback'>{errors.userPassword}</div>}

                </Form.Group>

                {authError && (
                  < div className="alert alert-danger" role="alert">
                   {authError}
                </div>
                )}
                
                <br />
                <Button variant="primary" onClick={handleLoginButton}>
                    Log in
                </Button>
                </Form>
                <br /><br />
                </div>
            </div>

        </div>

      )
    }
