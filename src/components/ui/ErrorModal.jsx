import "./ErrorModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import logo from "/images/cueref_logo_coral_btn.svg";

function ErrorModal({ error, errorModalShow, setErrorModalShow }) {
  const handleErrorModalClose = () => setErrorModalShow(false);

  return (
    <Modal
      show={errorModalShow}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={handleErrorModalClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          Something went wrong!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="error-text">Error message: {error}</p>
        <p className="error-text">Please try again later </p>
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

export default ErrorModal;
