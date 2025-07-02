import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About CueRef</h1>
      </header>

      <section className="about-content">
        <p>
          CueRef is a metadata extraction and matching tool designed
          specifically for music used in video production. We help editors,
          producers, and rights managers quickly extract track information from
          EDL files and match it with metadata from various music libraries,
          eliminating hours of manual work.
        </p>

        <p>
          The idea for CueRef came from a real problem: tracking down music
          metadata from video projects is incredibly time-consuming and
          error-prone. What started as a tool to help a friend has grown into a
          comprehensive solution that streamlines the entire music cue
          referencing process.
        </p>

        <p>
          Whether you're working with Epidemic Sound, Extreme Music, Upright
          Music, or any other libraries, CueRef makes it easy to process EDL
          files and get the metadata you need. Our tool is built for
          professionals who value accuracy and efficiency in their workflow.
        </p>

        <p>
          CueRef is currently in beta testing, which means we're continuously
          improving the service based on user feedback. We're actively adding
          support for new music libraries and enhancing our matching algorithms
          to provide even better results.
        </p>

        <div className="about-cta">
          <Link to="/">Ready to streamline your music metadata workflow?</Link>
          <p
            style={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              marginTop: "0.5rem",
            }}
          >
            Currently in beta - new libraries and features added regularly.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
