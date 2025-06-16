import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ loggedInUser }) {
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
            <Nav>
              <Nav.Item className="text-light">
                Hello User: <strong>{loggedInUser ? loggedInUser : 'Guest'}</strong>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;