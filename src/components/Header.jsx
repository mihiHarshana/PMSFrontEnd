import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

function Header({ loggedInUser }) {

      const navigator = useNavigate();

function handlleLogOutclick(e) {
  e.preventDefault();
  console.log('Logout is clicked');
  localStorage.removeItem("token"); 
  navigator('/');
}

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Prescription Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/patietnregistration">Patient Registration</Nav.Link>
              <Nav.Link as={Link} to="/addprescription">Create Prescription</Nav.Link>
            </Nav>

{loggedInUser?.userType === '1' && (
  <NavDropdown
    title="Administrator"
    id="user-nav-dropdown"
    className="text-light pe-3"
    menuVariant="dark"
  >
    <NavDropdown.Item as={Link} to="/RegisterUser">
      Register User
    </NavDropdown.Item>
  </NavDropdown>
)}





  <NavDropdown
    title={`Hello, ${loggedInUser ? loggedInUser.username : 'Guest'}`}
    id="user-nav-dropdown"
    className="text-light"
    menuVariant="dark"
  >
    {loggedInUser && (
      <NavDropdown.Item as={Link} to="/logout" onClick={handlleLogOutclick}>
        Log Out 
      </NavDropdown.Item>
    )}
    {!loggedInUser && (
      <NavDropdown.Item as={Link} to="/login">
        Log In
      </NavDropdown.Item>
    )}
  </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;