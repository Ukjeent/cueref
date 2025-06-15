import "./SummarySection.css";

function SummarySection() {
  return (
    <div className="summary-section-wrapper">
      <section className="summary-section">
        <p id="fileCount" className="file-count">
          Files loaded: 0
        </p>
        <p className="divider">|</p>

        <p id="matchedCuesCount" className="matched-cues-count">
          Matched cues: 0
        </p>
        <p className="divider">|</p>

        <p id="unmatchedCuesCount" className="unmatched-cues-count">
          Unmatched cues: 0
        </p>
        <p className="divider">|</p>

        <p id="libraryCount" className="library-count">
          Libraries: 0
        </p>
        <p className="divider">|</p>

        <p id="frames-display" className="frames-display">
          Frames: fps
        </p>
      </section>
    </div>
  );
}

export default SummarySection;
