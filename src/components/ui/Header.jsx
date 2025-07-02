import "./Header.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "/images/cueref_logo_coral_btn.svg";
import { useAuthContext } from "../../contexts/AuthContext";

function Header({ handleLoginClick }) {
  const { user, userEmail, isLoggedIn, userLogout } = useAuthContext();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="CueRef Logo" style={{ height: "60px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Nav className="me-auto">
            {isLoggedIn && userEmail !== "" ? (
              <Nav.Link className="nav-link-info">User: {userEmail}</Nav.Link>
            ) : (
              ""
            )}
            {!isLoggedIn ? (
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
            ) : (
              <Nav.Link onClick={() => userLogout()}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
