
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export const HomePage = ({loggedInUser}) => {

  const navigator = useNavigate();  
  function handlePatientRegistration() {
      <Link to="/registerpatient"></Link>
}
  return (
    <>
    <Header loggedInUser={loggedInUser} />
    <h3>Welcome to The home page. select item from the menu to proceed.</h3>

    </>


      )
  
}
