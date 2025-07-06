import "./FooterSection.css";
import { useAuthContext } from "../../contexts/AuthContext";
import logo from "/images/cueref_logo_coral_btn.svg";
import { Link } from "react-router-dom";

function FooterSection({ handleLoginClick }) {
  const { user, userEmail, isLoggedIn, userLogout } = useAuthContext();

  return (
    <footer className="footer-section">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div>
            <h3>CueRef</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                {isLoggedIn && userEmail !== "" ? (
                  <Link to="/myaccount">My Account</Link>
                ) : !isLoggedIn ? (
                  <span onClick={handleLoginClick}>Login</span>
                ) : (
                  ""
                )}
              </li>
              <li>
                <Link to="/termsandconditions">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact us</h3>
            <ul>
              <li>
                <a href="mailto:info@cueref.com">bjorn@bjrn.dev</a>
              </li>
              <li>Stockholm, Sweden</li>
            </ul>
          </div>
        </div>

        <div className="footer-logo-div">
          <Link to="/">
            <img
              className="footer-logo"
              src={logo}
              alt="CueRef Logo"
              style={{ height: "80px" }}
            />
          </Link>
        </div>
      </div>
      <p className="copyright-p">
        Copyright © 2025 CueRef. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterSection;
