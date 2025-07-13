import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
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

  const handleLogout = () => {
    userLogout(() => navigate("/"));
  };

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    email: userEmail,
    currentPassword: "secretpassword",
    newPassword: "",
    accountType: accountType,
  });

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
            {/* <div className="email-update-row" style={{ flex: 1 }}>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={userEmail ? userEmail : ""}
                // {userEmail ? value={userEmail} : ''}
                onChange={handleInputChange}
                readOnly
              />
              <button className="save-btn" type="button">
                Update
              </button>
            </div> */}
            <div className="form-group">
              <div className="account-type-value">
                {formData.email ? formData.email : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="form-section update-password-section">
        <div className="form-group">
          <label className="label" htmlFor="new-password">
            Update Password
          </label>
          <div className="password-update-row">
            <div className="password-input-container" style={{ flex: 1 }}>
              <input
                className="input"
                type={showPassword.new ? "text" : "password"}
                id="new-password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? "Hide" : "Show"}
              </button>
            </div>
            <button className="save-btn" type="button">
              Update
            </button>
          </div>
        </div>
      </div> */}

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
      </div>
      <div>
        <button className="logout-btn" onClick={() => handleLogout()}>
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountInformation;
