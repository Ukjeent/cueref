import React from "react";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  return (
    <div className="terms-page">
      <header className="terms-header">
        <h1>Terms & Conditions</h1>
      </header>

      <section className="terms-content">
        <h2>1. About These Terms</h2>
        <p>
          <strong>Short version</strong>: CueRef is a free beta service for
          music metadata extraction from EDL files. These terms govern your use
          of our service during the testing phase.
        </p>

        <p>
          These Terms & Conditions ("Terms") govern your access to and use of
          CueRef, a metadata extraction tool for music cues in video production
          operated by Bjorn Jakobsen, based in Stockholm, Sweden ("we," "us," or
          "CueRef"). By creating an account or using our service, you agree to
          these Terms.
        </p>

        <p>
          CueRef is currently in beta testing phase and provided free of charge.
          The service processes Edit Decision List (EDL) files uploaded by users
          to match music metadata from various libraries, generating Excel
          reports of results.
        </p>

        <h2>2. Beta Service Notice</h2>
        <p>
          <strong>Short version</strong>: CueRef is experimental software in
          beta testing. Use at your own risk and don't rely on it for critical
          work.
        </p>

        <p>
          <strong>
            IMPORTANT: CueRef is currently in beta testing and is provided "AS
            IS" and "AS AVAILABLE" for testing purposes only.
          </strong>{" "}
          The beta service:
        </p>
        <ul>
          <li>Contains bugs, errors, and may not function correctly</li>
          <li>May experience unexpected downtime or data loss</li>
          <li>Could change significantly or be discontinued without notice</li>
          <li>Should not be used for critical production workflows</li>
          <li>Comes with no warranties or support guarantees</li>
        </ul>

        <h2>3. Privacy and Data Protection</h2>
        <p>
          <strong>Short version</strong>: We collect only essential information
          (email and password) and process files temporarily. No cookies or
          tracking.
        </p>

        <p>
          Your privacy is important to us. We comply with EU General Data
          Protection Regulation (GDPR) and Swedish privacy laws.
        </p>

        <p>
          <strong>What we collect:</strong>
        </p>
        <ul>
          <li>Email address and password for your account</li>
          <li>
            EDL files you upload (stored temporarily for processing and service
            improvement)
          </li>
          <li>Basic service usage information</li>
        </ul>

        <p>
          <strong>File storage and processing:</strong>
        </p>
        <ul>
          <li>Files are processed immediately upon upload</li>
          <li>
            We may retain files temporarily to ensure processing accuracy and
            improve our service
          </li>
          <li>
            Files may be stored longer if processing errors occur, to help us
            debug and enhance the service
          </li>
          <li>
            Files are automatically deleted after processing is complete and any
            issues are resolved
          </li>
        </ul>

        <p>
          <strong>What we don't collect:</strong>
        </p>
        <ul>
          <li>We don't use cookies or tracking technologies</li>
          <li>We don't collect personal information beyond what's necessary</li>
        </ul>

        <h2>4. Beta Testing and Future Changes</h2>
        <p>
          <strong>Short version</strong>: The beta service is temporary and may
          change or end. We'll notify you about major changes and transitions to
          paid services.
        </p>

        <p>
          During the beta testing phase, the service is provided free of charge
          and we may modify, suspend, or discontinue features at any time. When
          the beta period ends, we may offer CueRef as a paid service with
          different terms.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          <strong>Short version</strong>: CueRef is provided "as is" during beta
          testing. Our liability is limited, and you use the service at your own
          risk.
        </p>

        <p>
          <strong>
            CueRef is provided "AS IS" and "AS AVAILABLE" without warranties of
            any kind.
          </strong>{" "}
          We are not liable for any damages arising from your use of the
          service, including data loss or service interruptions.
        </p>

        <h2>6. Contact Information</h2>
        <p>For questions about these Terms or CueRef:</p>
        <ul>
          <li>Email: bjorn@bjrn.dev</li>
          <li>Address: Stockholm, Sweden</li>
        </ul>

        <div className="terms-footer">
          <p>
            <strong>Effective Date:</strong> July 2, 2025
            <br />
            <strong>Last Updated:</strong> July 2, 2025
          </p>

          <p>
            By using CueRef, you acknowledge that you've read, understood, and
            agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </section>
    </div>
  );
}

export default TermsAndConditions;
