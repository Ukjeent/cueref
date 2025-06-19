import "./UploadSection.css";
import { useState, useRef, useEffect } from "react";

function UploadSection({
  sendFormData,
  error,
  songCount,
  isProcessing,
  estimatedSeconds,
  processingReady,
}) {
  const [data, setData] = useState(null);
  const fileInputRef = useRef(null);
  const [filenames, setFilenames] = useState("");
  const [songCountReady, setSongCountReady] = useState(false);
  const [animationTime, setAnimationTime] = useState(60);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [processingInfo, setProcessingInfo] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    if (isProcessing && songCount) {
      const estimatedMinutes = Math.ceil(estimatedSeconds / 60);
      setAnimationTime(estimatedSeconds);
      setEstimatedMinutes(estimatedMinutes);
      setFilenames(`Processing ${fileCount} file(s) and ${songCount} songs`);
      setProcessingInfo(
        `Estimated time: ${estimatedMinutes} minutes on our development server during beta testing`
      );
      setSongCountReady(true);
    }
  }, [songCount, isProcessing, estimatedSeconds, estimatedMinutes, fileCount]);

  const createFormData = (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    const frameRate = document.querySelector("#frameRate").value;
    formData.append("frames", frameRate);
    return formData;
  };

  function handleClick() {
    if (fileInputRef.current) {
      if (fileCount === 1) {
        const formData = createFormData(data);
        sendFormData(formData);
        setFilenames("Processing " + fileCount + " file...");
        fileInputRef.current.value = "";
      } else if (fileCount > 1) {
        const formData = createFormData(data);
        sendFormData(formData);
        setFilenames("Processing " + fileCount + " file(s)...");
        fileInputRef.current.value = "";
      }
    }

    if (fileCount === 0 && isProcessing === false) {
      setFilenames("No files uploaded");
    } else if (isProcessing === true) {
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
    setData(files);
    // setIsProcessing(false);
    setFileCount(files.length);
    setFilenames(filenameStr);
    files.value = null; // Reset the input value
  }

  return (
    <div className="upload-section">
      <div className="file-row">
        <label htmlFor="fileInput" className="custom-file-label">
          Upload EDL files
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
        <button
          onClick={handleClick}
          id="processButton"
          className="button"
          // className={`button ${isProcessing ? "loader-text" : ""}`}
        >
          Process
        </button>
      </div>
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
      <div className="file-upload-info">
        <div className="processing-info">
          <p id="fileNameDisplay" className="file-name">
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

        {isProcessing && songCountReady ? (
          <p id="songProcessingDisplay" className="file-name">
            {processingInfo}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UploadSection;
