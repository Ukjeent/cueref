import "./WelcomeBanner.css";
import welcomeImage from "/images/Untitled.png";

function WelcomeBanner({ handleShowUploadSectionClick, showUploadSection }) {
  return (
    <div className="welcome-banner">
      <div
        style={{ fontSize: "1.2rem", padding: "1rem 1rem 1rem 1rem" }}
        className="welcome-banner-text"
      >
        <h1>Welcome to CueRef</h1>
        <p>
          CueRef is a metadata extraction and matching tool for music used in
          video production. It helps editors, producers, and rights managers
          extract track information from EDL files and match it with metadata
          from various music libraries.
        </p>
        <button
          onClick={handleShowUploadSectionClick}
          // className={`button ${showUploadSection ? "hide" : ""}`}
          className={"button"}
        >
          Try it out!
        </button>
      </div>
      <img
        className="welcome-banner-image"
        src={welcomeImage}
        alt="test image"
        style={{ height: "350px" }}
      />
    </div>
  );
}

export default WelcomeBanner;
