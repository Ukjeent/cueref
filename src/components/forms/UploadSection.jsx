import "./UploadSection.css";
import { useState, useRef, useEffect } from "react";

function UploadSection({
  error,
  isProcessing,
  handleClick,
  handleFileChange,
  filenames,
  setFrames,
  fileInputRef,
  animationTime,
  processingInfo,
  songCountReady,
  processingReady,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  const handleDropZoneClick = () => {
    if (fileInputRef.current && !isProcessing) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-section">
      <h3 style={{ marginTop: "-15px", marginBottom: "10px" }}>
        Upload EDL Files
      </h3>
      <div className="file-row">
        <label
          htmlFor="fileInput"
          className={`custom-file-label ${isProcessing ? "disabled" : ""}`}
        >
          Select files
        </label>
        <input
          ref={fileInputRef}
          disabled={isProcessing}
          onChange={handleFileChange}
          type="file"
          id="fileInput"
          className="file-input"
          accept=".edl"
          multiple
        />
        <button
          onClick={handleClick}
          disabled={isProcessing}
          id="processButton"
          className="button"
        >
          {isProcessing ? "Processing..." : "Process"}
        </button>
      </div>
      <label htmlFor="frameRate">Select frame rate:</label>
      <select
        defaultValue="25"
        disabled={isProcessing}
        onChange={(e) => setFrames(e.target.value)}
        id="frameRate"
        name="frameRate"
      >
        <option value="23.976">23.976 fps</option>
        <option value="24">24 fps</option>
        <option value="25">25 fps</option>
        <option value="29.97">29.97 fps</option>
        <option value="30">30 fps</option>
        <option value="50">50 fps</option>
        <option value="59.94">59.94 fps</option>
        <option value="60">60 fps</option>
      </select>
      <div className="file-upload-info">
        <div className="processing-info">
          <p
            id="fileNameDisplay"
            className={`processing-text ${filenames !== "" ? "show" : ""}`}
          >
            {filenames}
          </p>
          {isProcessing && (
            <div
              className="loader"
              style={{
                "--animation-duration": `${animationTime}s`,
              }}
            ></div>
          )}
        </div>
        <p
          id="songProcessingDisplay"
          className={`processing-text ${
            (isProcessing || processingReady) && songCountReady ? "show" : ""
          }`}
        >
          {processingInfo}
        </p>
        {!isProcessing ? (
          <div
            className={`drop-zone ${isProcessing ? "disabled" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleDropZoneClick}
          >
            Drop files here
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UploadSection;
