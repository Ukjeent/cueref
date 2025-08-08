import "./LoginModal.css";
import { useState, useEffect } from "react";
import logo from "/images/cueref_logo_coral_btn.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../../contexts/AuthContext";

function LoginModal({ modalShow, setModalShow }) {
  const {
    register,
    login,
    sendResetEmail,
    loading,
    apiResponse,
    setApiResponse,
    wrongPassword,
  } = useAuth();

  const { clearInfo, setClearInfo, closeModal, isLoggedIn } = useAuthContext();

  const [createUserView, setCreateUserView] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [registerEmailTouched, setRegisterEmailTouched] = useState(false);
  const [loginValidationError, setLoginValidationError] = useState(false);
  const [registerValidationError, setRegisterValidationError] = useState(false);
  const [forgotValidationError, setForgotValidationError] = useState(false);
  const [forgotPasswordEmailTouched, setForgotPasswordEmailTouched] =
    useState(false);
  const [registerPasswordTouched, setRegisterPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (clearInfo) {
      setCreateUserView(false);
      setLoginEmail("");
      setRegisterEmail("");
      setForgotPasswordEmail("");
      setLoginPassword("");
      setRegisterPassword("");
      setConfirmPassword("");
      setEmailTouched(false);
      setRegisterEmailTouched(false);
      setForgotPasswordEmailTouched(false);
      setRegisterPasswordTouched(false);
      setConfirmPasswordTouched(false);
      setLoginValidationError(false);
      setRegisterValidationError(false);
      setClearInfo(false);
    }
    if (closeModal) {
      setModalShow(false);
    }
    if (!modalShow) {
      setCreateUserView(false);
      setForgotPasswordView(false);
    }
  }, [clearInfo, closeModal, modalShow]);

  const clearSensitiveInfo = () => {
    setLoginPassword("");
    setRegisterPassword("");
    setConfirmPassword("");
    setEmailTouched(false);
    setRegisterEmailTouched(false);
    setForgotPasswordEmailTouched(false);
    setRegisterPasswordTouched(false);
    setConfirmPasswordTouched(false);
    setLoginValidationError(false);
    setRegisterValidationError(false);
    setApiResponse(false);
  };

  const handleClose = () => {
    setModalShow(false);
    clearSensitiveInfo();
  };

  const validateAndLogin = () => {
    if (emailPattern.test(loginEmail) && loginPassword !== "") {
      login(loginEmail, loginPassword);
    } else {
      setLoginValidationError(true);
    }
  };

  const validateAndRegister = () => {
    if (
      emailPattern.test(registerEmail) &&
      registerPassword !== "" &&
      confirmPassword !== "" &&
      registerPassword === confirmPassword
    ) {
      register(registerEmail, registerPassword);
    } else {
      setRegisterValidationError(true);
    }
  };

  const validateAndReset = () => {
    if (emailPattern.test(forgotPasswordEmail)) {
      sendResetEmail(forgotPasswordEmail);
      console.log(forgotPasswordEmail);
    } else {
      setForgotValidationError(true);
    }
  };

  const handleCreateUserClick = () => {
    clearSensitiveInfo();
    setCreateUserView(true);
    setRegisterEmail(loginEmail);
  };

  const handleBackToLoginClick = (createUser) => {
    clearSensitiveInfo();
    createUser ? setCreateUserView(false) : setForgotPasswordView(false);
    createUser
      ? setLoginEmail(registerEmail)
      : setLoginEmail(forgotPasswordEmail);
  };

  const handleForgotPasswordClick = () => {
    clearSensitiveInfo();
    setForgotPasswordView(true);
    setForgotPasswordEmail(loginEmail);
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
          {createUserView
            ? "Create account"
            : forgotPasswordView
            ? "Reset password"
            : "Login"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div
          className={`view-container  ${
            createUserView ? "register-active" : "login-active"
          }`}
        >
          {/* ################ */}
          {/* Login View Start */}
          {/* ################ */}

          <div className={`login-view`}>
            <div className="modal-form-wrapper">
              <Form noValidate>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginValidationError(false);
                      setEmailTouched(false);
                    }}
                    onBlur={() => setEmailTouched(true)}
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndLogin();
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
                      (emailTouched || loginValidationError) &&
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
                    disabled={loading}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginValidationError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndLogin();
                      }
                    }}
                    type="password"
                  />
                  <p
                    className={`form-error-info ${
                      loginValidationError && loginPassword === ""
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Password cannot be empty
                  </p>
                </Form.Group>

                <Button
                  disabled={!loginEmail || !loginPassword || loading}
                  onClick={validateAndLogin}
                  className={"button"}
                  id="login-button"
                >
                  <div className="login-text-wrap">
                    <div>Login</div>
                    {loading && <div className="loader-spin"></div>}
                  </div>
                </Button>
                <p
                  className={`form-response-info ${apiResponse ? "show" : ""}`}
                >
                  {apiResponse}
                </p>
                <a
                  disabled={loading}
                  onClick={() => handleForgotPasswordClick()}
                  className="forgot-password-link"
                >
                  Forgot your password?
                </a>
              </Form>
              <div className="create-account-wrapper">
                <button
                  onClick={handleCreateUserClick}
                  disabled={loading}
                  className="create-account-button"
                >
                  Create an account
                </button>
              </div>
            </div>
          </div>

          {/* ############## */}
          {/* Login View End */}
          {/* ############## */}

          {/* ###################### */}
          {/* Create User View Start */}
          {/* ###################### */}

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
                    disabled={loading}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      setRegisterValidationError(false);
                      setRegisterEmailTouched(false);
                    }}
                    onBlur={() => setRegisterEmailTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndRegister();
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
                      (registerEmailTouched || registerValidationError) &&
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
                    disabled={loading}
                    onChange={(e) => {
                      setRegisterPassword(e.target.value);
                      setRegisterValidationError(false);
                      setRegisterPasswordTouched(false);
                    }}
                    onBlur={() => setRegisterPasswordTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndRegister();
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
                      (registerPasswordTouched || registerValidationError) &&
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
                    disabled={loading}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setRegisterValidationError(false);
                      setConfirmPasswordTouched(false);
                    }}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndRegister();
                      }
                    }}
                    className={
                      confirmPassword === ""
                        ? ""
                        : confirmPassword.length >= 8 &&
                          registerPassword === confirmPassword
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      (confirmPasswordTouched || registerValidationError) &&
                      confirmPassword.length >= 8 &&
                      registerPassword.length >= 8 &&
                      registerPassword !== confirmPassword
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Passwords do not match
                  </p>
                </Form.Group>

                <Button
                  disabled={
                    !registerEmail ||
                    !registerPassword ||
                    !confirmPassword ||
                    loading
                  }
                  onClick={validateAndRegister}
                  className={"button"}
                  id="register-button"
                >
                  <div className="register-text-wrap">
                    <div>Create account</div>
                    {loading && <div className="loader-spin"></div>}
                  </div>
                </Button>
                <p
                  className={`form-response-info ${apiResponse ? "show" : ""}`}
                >
                  {apiResponse}
                </p>
              </Form>
              <div className="create-account-wrapper">
                <button
                  disabled={loading}
                  onClick={() => handleBackToLoginClick(true)}
                  className="create-account-button"
                >
                  Go back to login
                </button>
              </div>
            </div>
          </div>

          {/* #################### */}
          {/* Create User View End */}
          {/* #################### */}

          {/* ########################## */}
          {/* Forgot password View Start */}
          {/* ########################## */}

          <div
            className={`forgot-password-view ${
              forgotPasswordView ? "show" : "hide"
            }`}
          >
            <div className="modal-form-wrapper">
              <Form noValidate>
                <Form.Group className="mb-3" controlId="forgotPasswordEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    disabled={loading}
                    value={forgotPasswordEmail}
                    onChange={(e) => {
                      setForgotPasswordEmail(e.target.value);
                      setForgotPasswordEmailTouched(false);
                      setForgotValidationError(false);
                    }}
                    onBlur={() => setForgotPasswordEmailTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        validateAndReset();
                      }
                    }}
                    className={
                      forgotPasswordEmail === ""
                        ? ""
                        : emailPattern.test(forgotPasswordEmail)
                        ? "is-valid"
                        : "is-invalid"
                    }
                  />
                  <p
                    className={`form-error-info ${
                      forgotPasswordEmailTouched &&
                      forgotPasswordEmail !== "" &&
                      !emailPattern.test(forgotPasswordEmail)
                        ? "form-error-info show"
                        : "form-error-info"
                    }`}
                  >
                    Please enter a valid email address
                  </p>
                </Form.Group>

                <Button
                  disabled={!forgotPasswordEmail || loading}
                  onClick={validateAndReset}
                  className={"button"}
                  id="forgot-email-button"
                >
                  <div className="forgot-text-wrap">
                    <div>Reset password</div>
                    {loading && <div className="loader-spin"></div>}
                  </div>
                </Button>
                <p
                  className={`form-response-info ${apiResponse ? "show" : ""}`}
                >
                  {apiResponse}
                </p>
              </Form>
              <div className="forgot-email-wrapper">
                <button
                  disabled={loading}
                  onClick={() => handleBackToLoginClick(false)}
                  className="forgot-email-button"
                >
                  Go back to login
                </button>
              </div>
            </div>
          </div>

          {/* ######################## */}
          {/* Forgot password View End */}
          {/* ######################## */}
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
