import "./LoginModal.css";
import logo from "/images/cueref_logo_coral_btn.svg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';




function LoginModal({modalShow, setModalShow}) {

    const handleClose = () => setModalShow(false);

  return (    
  <Modal
  show={modalShow}
    backdrop="static"
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton onClick={handleClose}>
      </Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      <Modal.Body>
        <div className="modal-form-wrapper">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>

            <Button className={'button'} id="login-button" type="submit">Save</Button>
            <a className="forgot-password-link">Forgot your password?</a>        
            </Form>
            <div className="create-account-wrapper">
                <button className="create-account-button">Create an account</button>
            </div>

    </div>
      </Modal.Body>
      <Modal.Footer>
            <img className="footer-logo" src={logo} alt="CueRef Logo" style={{ height: "50px" }} />
      </Modal.Footer>
    </Modal>
)}

  export default LoginModal