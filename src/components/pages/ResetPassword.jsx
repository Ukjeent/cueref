import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import useAuth from "../../hooks/useAuth";

const ResetPassword = () => {
  const { ResetPassword, apiResponse, loading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  useEffect(() => {
    const url = location.pathname + location.search + location.hash;

    const searchParams = new URLSearchParams(location.search);
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      navigate("/");
    }
  }, [location]);

  // You'll implement these functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && newPassword.length >= 8 && newPassword === confirmPassword) {
      ResetPassword(token, newPassword);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordTouched(false);
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmTouched(false);
  };

  const goBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="app-container">
      <main>
        <div className="reset-password-container">
          <div className="reset-password-card">
            <div className="reset-password-header">
              <h1>Reset Your Password</h1>
              <p>Enter your new password below</p>
            </div>

            <form onSubmit={handleSubmit} className="reset-password-form">
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  disabled={loading}
                  value={newPassword}
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordTouched(true)}
                  className={`form-input ${
                    newPassword === ""
                      ? ""
                      : newPassword.length >= 8
                      ? "valid"
                      : "invalid"
                  }`}
                  placeholder="Enter new password"
                  required
                />
                {passwordTouched &&
                  newPassword.length > 0 &&
                  newPassword.length < 8 && (
                    <span className="error-text">
                      Password must be at least 8 characters
                    </span>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  disabled={loading}
                  onChange={handleConfirmChange}
                  onBlur={() => setConfirmTouched(true)}
                  className={`form-input ${
                    confirmPassword === ""
                      ? ""
                      : confirmPassword.length >= 8 &&
                        newPassword === confirmPassword
                      ? "valid"
                      : "invalid"
                  }`}
                  placeholder="Confirm new password"
                  required
                />
                {confirmTouched &&
                  confirmPassword.length >= 8 &&
                  newPassword !== confirmPassword && (
                    <span className="error-text">Passwords do not match</span>
                  )}
              </div>

              <button
                type="submit"
                className="button submit-button"
                disabled={!newPassword || !confirmPassword || loading}
              >
                <div className="register-text-wrap">
                  <div>Reset Password</div>
                  {loading && <div className="loader-spin reset"></div>}
                </div>
              </button>
              <p className={`reset-response-info ${apiResponse ? "show" : ""}`}>
                {apiResponse}
              </p>
            </form>

            <div className="reset-password-footer">
              <a onClick={goBack} className="back-link">
                ← Back to CueRef
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
