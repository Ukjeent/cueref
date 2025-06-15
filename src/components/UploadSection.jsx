import "./UploadSection.css";
import { useState, useRef } from "react";

function UploadSection() {
  const fileInputRef = useRef(null);
  const [fileCount, setFileCount] = useState(0);
  const [filenames, setFilenames] = useState("");
  const [processing, setProcessing] = useState(false); // Placeholder for processing state

  function handleClick() {
    if (fileInputRef.current) {
      if (fileCount === 1) {
        setFilenames("Processing " + fileCount + " file...");
        fileInputRef.current.value = "";
        setProcessing(true);
      } else if (fileCount > 1) {
        setFilenames("Processing " + fileCount + " file(s)...");
        fileInputRef.current.value = "";
        setProcessing(true);
      }
    }

    if (fileCount === 0 && processing === false) {
      setFilenames("No files uploaded");
    } else if (processing === true) {
      setFilenames(
        "Still processing " + fileCount + " file(s)... - please wait"
      );
    }
  }

  function handleFileChange(e) {
    let filenameStr = "";
    let filenameArr = [];
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      filenameArr.push(files[i].name);
    }

    if (files.length === 1) {
      filenameStr = "Uploaded file: ";
    } else if (files.length > 1) {
      filenameStr = "Uploaded files: ";
    }

    for (let i = 0; i < filenameArr.length; i++) {
      if (i === e.target.files.length - 1) {
        filenameStr += filenameArr[i];
      } else {
        filenameStr += filenameArr[i] + " / ";
      }
    }
    setProcessing(false);
    setFileCount(files.length);
    setFilenames(filenameStr);
    files.value = null; // Reset the input value
  }

  return (
    <div className="upload-section">
      <div className="file-row">
        <label htmlFor="fileInput" className="custom-file-label">
          📂 Upload EDL files
        </label>
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          id="fileInput"
          className="file-input"
          accept=".edl"
          multiple
        />
        <button onClick={handleClick} id="processButton" className="button">
          Process
        </button>
      </div>
      <p id="fileNameDisplay" className="file-name">
        {filenames}
      </p>
      <label htmlFor="frameRate">Select frame rate:</label>
      <select id="frameRate" name="frameRate">
        <option value="23.976">23.976 fps</option>
        <option value="24">24 fps</option>
        <option value="25" selected>
          25 fps
        </option>
        <option value="29.97">29.97 fps</option>
        <option value="30">30 fps</option>
        <option value="50">50 fps</option>
        <option value="59.94">59.94 fps</option>
        <option value="60">60 fps</option>
      </select>
    </div>
  );
}

export default UploadSection;
