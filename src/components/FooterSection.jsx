import "./FooterSection.css";

import logo from "/images/cueref_logo_coral_btn.svg";


function FooterSection({}) {
  return (
    <footer className="footer-section">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div>
            <h3>CueRef</h3>
            <ul>
              <li><a href="#">Guide</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Account</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3>Contact us</h3>
            <ul>
              <li><a href="mailto:info@cueref.com">info@cueref.com</a></li>
              <li>Stockholm, Sweden</li>
            </ul>
          </div>
        </div>

        <div className="footer-logo-div">
          <a href="#">
            <img className="footer-logo" src={logo} alt="CueRef Logo" style={{ height: "80px" }} />
          </a>
          </div>
      </div>
      <p className="copyright-p">Copyright © 2025 CueRef. All rights reserved.</p>
    </footer>
  );
}

export default FooterSection;