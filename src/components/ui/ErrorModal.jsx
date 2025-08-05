import "./ErrorModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import logo from "/images/cueref_logo_coral_btn.svg";

function ErrorModal({ error, setError, errorModalShow, setErrorModalShow }) {
  const handleErrorModalClose = () => {
    setErrorModalShow(false);
    setError("");
  };

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
        <div className="error-text-wrapper">
          <p className="error-text">Information:</p>
          <div
            className="error-html"
            dangerouslySetInnerHTML={{ __html: error }}
          />
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

export default ErrorModal;
