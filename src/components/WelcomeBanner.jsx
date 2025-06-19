import  "./WelcomeBanner.css";

function WelcomeBanner() {
  return (
        <div className="welcome-banner">
        <div style={{ fontSize: "1.2rem", padding: "1rem 2rem 1rem 2rem" }} className="welcome-banner-text">
        <h1>Welcome to CueRef</h1>
        <p >
          CueRef is a metadata extraction and matching tool for music used in video production. It helps editors, producers, and rights managers extract track information from EDL files and match it with metadata from various music libraries.
        </p>
        <button
          className="button"
        >
          Try it out!
        </button>
        </div>
          <img
            src="/images/Untitled.png"
            alt="test image"
            style={{ height: "350px" }}
          />
          </div>
  )}

  export default WelcomeBanner;