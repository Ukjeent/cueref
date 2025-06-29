import "./Header.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "/images/cueref_logo_coral_btn.svg";
import { useAuthContext } from "../contexts/AuthContext";

function Header({ setModalShow }) {
  const handleLoginClick = () => setModalShow(true);
  const { user, userEmail, isLoggedIn, userLogout } = useAuthContext();
  const [loginBtnTxt, setLoginBtnTxt] = useState("Login");

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     setLoginBtnTxt("Login");
  //   } else if (isLoggedIn && userEmail !== "") {
  //     setLoginBtnTxt(`Loged in as: ${userEmail}`);
  //   } else if (isLoggedIn && !userEmail) {
  //     setLoginBtnTxt("Logout");
  //   } else {
  //     setLoginBtnTxt("what");
  //   }
  // }, [isLoggedIn]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src={logo} alt="CueRef Logo" style={{ height: "60px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav" placement="end">
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {!isLoggedIn ? (
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
            ) : isLoggedIn && userEmail !== "" ? (
              <Nav.Link onClick={() => userLogout()}>
                Logged in as: ${userEmail}
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => userLogout()}>Logout</Nav.Link>
            )}
            {/* // <Nav.Link onClick={handleLoginClick}>{loginBtnTxt}</Nav.Link> */}
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
