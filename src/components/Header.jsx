import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
function Header() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      // bg="dark"
      // data-bs-theme="dark"
      // sticky="top" // Sticky navbar
    >
      <Container    
>
        <Navbar.Brand href="#home">
          <img
            src="/images/cueref_logo_coral_btn.svg"
            alt="CueRef Logo"
            style={{ height: "60px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header data-bs-theme="dark" closeButton></Offcanvas.Header>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link disabled href="#link">
              About
            </Nav.Link>
            <Nav.Link disabled href="#link">
              Pricing
            </Nav.Link>
            <Nav.Link disabled href="#link">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
