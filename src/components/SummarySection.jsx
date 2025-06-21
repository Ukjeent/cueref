import "./SummarySection.css";
import { useState, useEffect } from "react";

function SummarySection({ processingReady, summaryData }) {
  return (
    <div className={`summary-section-wrapper`}>
      <section
        className={`summary-section ${processingReady ? "show-summary" : ""}`}
      >
        <p id="fileCount" className="file-count">
          Files loaded: {summaryData?.files || 0}
        </p>
        <p className="divider">|</p>

        <p id="matchedCuesCount" className="matched-cues-count">
          Matched cues: {summaryData?.matchedCues || 0}
        </p>
        <p className="divider">|</p>
        <div className="summary-divider show-tablet">
          <p id="unmatchedCuesCount" className="unmatched-cues-count">
            Unmatched cues: {summaryData?.unmatchedCues || 0}
          </p>
          <p className="divider">|</p>
        </div>
        <div className="summary-divider show-small-tablet">
          <p id="libraryCount" className="library-count">
            Libraries: {summaryData?.libraries || 0}
          </p>
          <p className="divider">|</p>
        </div>

        <p id="frames-display" className="frames-display">
          Frames: {summaryData?.frames || 0} fps
        </p>
      </section>
    </div>
  );
}

export default SummarySection;
