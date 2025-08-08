import React from "react";
import "./ExportGuide.css";
import { Link } from "react-router-dom";

function ExportGuide() {
  return (
    <div className="export-page">
      <header className="export-header">
        <h1>How to Export an EDL in Avid Media Composer (Step-by-Step)</h1>
      </header>

      <section className="export-content">
        <p>
          Need to export an EDL from Avid but not sure where to start? Whether
          you're delivering for sound, music cue sheets, or grading, this quick
          guide walks you through the process. It's easier than it sounds — we
          promise.
        </p>

        <h2>📺 Quick Video Guide</h2>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="How to export an EDL in Avid"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <p>or ...</p>
        <p>
          <p>
            <strong>🎥 Watch the tutorial on YouTube:</strong>
          </p>
          <p>
            <a
              href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to Export an EDL in Avid Media Composer
            </a>
          </p>

          <em>
            Prefer to read instead? Scroll down for the step-by-step written
            guide with images.
          </em>
        </p>

        <h2>📝 Written Instructions</h2>

        <h3>Step 1: Open Your Timeline</h3>
        <p>
          Open the sequence you want to export as an EDL. Clean it up by
          removing tracks you don’t need (for example, keep only music tracks).
        </p>
        <img
          src="/images/edl_step1.png"
          alt="Avid timeline open with music tracks"
        />

        <h3>Step 2: Open EDL Manager</h3>
        <p>
          Go to <strong>Tools &gt; EDL Manager</strong> or open it from the Avid
          Applications folder. It runs as a separate tool.
        </p>
        <img
          src="/images/edl_step2.png"
          alt="Location of EDL Manager in Avid menu"
        />

        <h3>Step 3: Load Your Sequence</h3>
        <p>
          In EDL Manager, click <strong>File &gt; Open Sequence</strong>, then
          select your bin and timeline.
        </p>
        <img
          src="/images/edl_step3.png"
          alt="Loading a sequence in EDL Manager"
        />

        <h3>Step 4: Choose Export Settings</h3>
        <p>
          Select a format like <strong>CMX 3600</strong>. Enable audio tracks if
          you're exporting music cues. Double-check that clip names are shown.
        </p>
        <img
          src="/images/edl_step4.png"
          alt="EDL export settings in EDL Manager"
        />

        <h3>Step 5: Export the File</h3>
        <p>
          Click <strong>File &gt; Export</strong>, then choose a name and
          destination. The EDL will be saved as a plain-text file (.edl or
          .txt).
        </p>
        <img src="/images/edl_step5.png" alt="Saving the EDL file" />

        <h3>💡 Tips & Troubleshooting</h3>
        <ul>
          <li>
            Keep clip names consistent and clean — they'll appear in the EDL.
          </li>
          <li>If tracks aren’t showing, check your export settings again.</li>
          <li>
            Need more metadata? Consider exporting an AAF for advanced
            workflows.
          </li>
        </ul>

        <div className="export-cta">
          <Link to="/">Ready to streamline your music metadata workflow?</Link>
          <p
            style={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              marginTop: "0.5rem",
            }}
          >
            Was this guide helpful? Let us know or suggest edits at
            <a href="mailto:info@cueref.com"> info@cueref.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default ExportGuide;
