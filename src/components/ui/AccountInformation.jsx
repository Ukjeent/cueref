import "./AccountInformation.css";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

function AccountInformation() {
  const navigate = useNavigate();
  const {
    userEmail,
    accountType,
    clearInfo,
    setClearInfo,
    isLoggedIn,
    userLogout,
  } = useAuthContext();

  const { sendResetEmail } = useAuth();

  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleLogout = () => {
    userLogout(() => navigate("/"));
  };

  const handleResetPassword = () => {
    sendResetEmail(userEmail ? userEmail : "");
    setResetEmailSent(true);
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">My Page</h1>
      </div>
      <div className="form-section update-email-section">
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="form-group">
              <div className="account-type-value">
                {userEmail ? userEmail : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="form-section account-type">
        <div className="form-group">
          <label className="label">Account type</label>
          <div
            style={{ textTransform: "capitalize" }}
            className="account-type-value"
          >
            {formData.accountType}
          </div>
        </div>
      </div> */}
      <div className="reset-email-container">
        <div className="form-section update-password-section">
          <div>
            <button className="logout-btn" onClick={handleResetPassword}>
              {" "}
              Reset Password
            </button>
          </div>
          <div>
            <button className="logout-btn" onClick={() => handleLogout()}>
              {" "}
              Logout
            </button>
          </div>
        </div>
        {resetEmailSent ? (
          <p>
            Email sent to:
            <span className="underlined-email">{userEmail}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default AccountInformation;
