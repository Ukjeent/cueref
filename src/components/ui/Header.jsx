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
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="CueRef Logo" style={{ height: "60px" }} />
        </Navbar.Brand>

        <Nav className="ms-auto">
          {!isLoggedIn ? (
            <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/myaccount">
              My Account
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
