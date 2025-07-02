import "./WelcomeBanner.css";
import welcomeImage from "/images/Untitled.png";

function WelcomeBanner({ handleShowUploadSectionClick, showUploadSection }) {
  return (
    <div className="welcome-banner">
      <div
        style={{ fontSize: "1.2rem", padding: "1rem 1rem 1rem 1rem" }}
        className="welcome-banner-text"
      >
        <h1>Welcome to CueRef (Beta)</h1>
        <p>
          Tired of manually identifying music tracks from your EDL files?
          <br></br>CueRef automatically extracts track information from EDL
          files and matches them with metadata from major music libraries. Built
          for editors, producers, and rights managers who need accurate music
          reporting. <br></br>
          <br></br>Beta version - more libraries coming soon.
        </p>
        <button onClick={handleShowUploadSectionClick} className={"button"}>
          Try for free!
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
