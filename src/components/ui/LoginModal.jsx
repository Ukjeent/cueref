import "./LoginModal.css";
import { useState, useEffect } from "react";
import logo from "/images/cueref_logo_coral_btn.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/AuthContext";

function LoginModal({ modalShow, setModalShow }) {
  const { register, login, loading, error, wrongPassword } = useAuth();

  const { clearInfo, setClearInfo, isLoggedIn } = useAuthContext();

  const [createUserView, setCreateUserView] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [registerEmailTouched, setRegisterEmailTouched] = useState(false);
  const [registerPasswordTouched, setRegisterPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (clearInfo) {
      setCreateUserView(false);
      setLoginEmail("");
      setRegisterEmail("");
      setLoginPassword("");
      setRegisterPassword("");
      setConfirmPassword("");
      setEmailTouched(false);
      setRegisterEmailTouched(false);
      setRegisterPasswordTouched(false);
      setConfirmPasswordTouched(false);
      setModalShow(false);
      setClearInfo(false);
    }
  }, [clearInfo]);

  const clearSensitiveInfo = () => {
    setLoginPassword("");
    setRegisterPassword("");
    setConfirmPassword("");
    setEmailTouched(false);
    setRegisterEmailTouched(false);
    setRegisterPasswordTouched(false);
    setConfirmPasswordTouched(false);
  };

  const handleClose = () => setModalShow(false);

  const handleCreateUserClick = () => {
    clearSensitiveInfo();
    setCreateUserView(true);
    setRegisterEmail(loginEmail);
  };
  const handleBackToLoginClick = () => {
    clearSensitiveInfo();
    setCreateUserView(false);
    setLoginEmail(registerEmail);
  };

  return (
    <Modal
      show={modalShow}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={clearSensitiveInfo}
    >
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          {createUserView ? "Create account" : "Login"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          className={`view-container  ${
            createUserView ? "register-active" : "login-active"
          }`}
        >
          <div className={`login-view ${createUserView ? "hide" : "show"}`}>
            <div className="modal-form-wrapper">
              <Form noValidate>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        login(loginEmail, loginPassword);
                      }
                    }}
                    className={
                      loginEmail === ""
                        ? ""
                        : emailPattern.test(loginEmail)
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      emailTouched &&
                      loginEmail !== "" &&
                      !emailPattern.test(loginEmail)
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Please enter a valid email address
                  </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        login(loginEmail, loginPassword);
                      }
                    }}
                    type="password"
                  />
                  <p style={{ color: "red" }}>
                    {wrongPassword ? "Wrong email or password" : ""}
                  </p>
                </Form.Group>

                <Button
                  onClick={() => login(loginEmail, loginPassword)}
                  className={"button"}
                  id="login-button"
                >
                  <div className="login-text-wrap">
                    <div>Login</div>
                    {loading && <div className="loader-spin"></div>}
                  </div>
                </Button>

                <a className="forgot-password-link">Forgot your password?</a>
              </Form>
              <div className="create-account-wrapper">
                <button
                  onClick={handleCreateUserClick}
                  className="create-account-button"
                >
                  Create an account
                </button>
              </div>
            </div>
          </div>

          <div
            className={`create-user-view ${createUserView ? "show" : "hide"}`}
          >
            <div className="modal-form-wrapper">
              <Form noValidate>
                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    onBlur={() => setRegisterEmailTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        register(registerEmail, registerPassword);
                      }
                    }}
                    className={
                      registerEmail === ""
                        ? ""
                        : emailPattern.test(registerEmail)
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      registerEmailTouched &&
                      registerEmail !== "" &&
                      !emailPattern.test(registerEmail)
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Please enter a valid email address
                  </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    onBlur={() => setRegisterPasswordTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        register(registerEmail, registerPassword);
                      }
                    }}
                    className={
                      registerPassword === ""
                        ? ""
                        : registerPassword.length >= 8
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      registerPasswordTouched &&
                      registerPassword.length > 0 &&
                      registerPassword.length < 8
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Password must be at least 8 characters
                  </p>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="registerConfirmPassword"
                >
                  <Form.Label>Retype password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        register(registerEmail, registerPassword);
                      }
                    }}
                    className={
                      confirmPassword === ""
                        ? ""
                        : registerPassword.length >= 8 &&
                          registerPassword === confirmPassword
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      confirmPasswordTouched &&
                      registerPassword.length >= 8 &&
                      confirmPassword.length >= 8 &&
                      registerPassword !== confirmPassword
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Passwords do not match
                  </p>
                </Form.Group>

                <Button
                  onClick={() => register(registerEmail, registerPassword)}
                  className={"button"}
                  id="register-button"
                >
                  <div className="register-text-wrap">
                    <div>Save</div>
                    {loading && <div className="loader-spin"></div>}
                  </div>
                </Button>
              </Form>
              <div className="create-account-wrapper">
                <button
                  onClick={() => handleBackToLoginClick()}
                  className="create-account-button"
                >
                  Go back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <img
          className="footer-logo"
          src={logo}
          alt="CueRef Logo"
          style={{ height: "50px" }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
