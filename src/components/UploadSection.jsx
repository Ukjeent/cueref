import "./UploadSection.css";
import { useState } from "../App.jsx";
import { useRef } from "react";
import { apiBase, endPoint } from "../config.js";

function UploadSection() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [filenames, setFilenames] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedSeconds, setEstimatedSeconds] = useState(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [processingInfo, setProcessingInfo] = useState("");
  const [songCountReady, setSongCountReady] = useState(false);
  const [processingReady, setProcessingReady] = useState(false);
  const [animationTime, setAnimationTime] = useState(60);
  const [fileCount, setFileCount] = useState(0);
  const [matchedCuesCount, setMatchedCuesCount] = useState(0);
  const [unmatchedCuesCount, setUnmatchedCuesCount] = useState(0);
  const [librariesCount, setLibrariesCount] = useState(0);
  const [frames, setFrames] = useState(0);

  const sendFormData = async (data) => {
    fetch(`${apiBase}/process-edl`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        console.log("Upload successful:", data);
        let maxTimeout = 600000;
        if (data.song_count) {
          const estimatedSeconds = Math.max(120, data.song_count * 2.5);
          maxTimeout = estimatedSeconds * 1000;
          const estimatedMinutes = Math.ceil(estimatedSeconds / 60);
          setEstimatedSeconds(estimatedSeconds);
          setAnimationTime(estimatedSeconds);
          setEstimatedMinutes(estimatedMinutes);
          setFilenames(
            `Processing ${fileCount} file(s) and ${data.song_count} songs`
          );
          setProcessingInfo(
            `Estimated time: ${estimatedMinutes} minutes on our development server during beta testing`
          );
          setSongCountReady(true);
        }

        if (data && data.upload_id) {
          console.log(`Stating pollAPI for upload ID: ${data.upload_id}`);
          const startPolling = async () => {
            const result = await pollApi(
              endPoint,
              "completed",
              1000,
              maxTimeout,
              data.upload_id
            );
            console.log("About to call updateSummarySection with:", result);
            if (result === null) {
              console.log("WARNING: Data is null - polling timed out!");
            }
            console.log("Update summary section with result:", result);
            setProcessingReady(true);
            fetch_songs(data.upload_id);
          };
          startPolling();
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };

  async function pollApi(
    endPoint,
    successResponse,
    pollingInterval,
    maxPollingDuration,
    uploadId
  ) {
    const apiEndpoint = endPoint + uploadId;
    console.log("Polling API endpoint:", apiEndpoint);

    const startTime = Date.now(); // Record the start time

    return new Promise((resolve, reject) => {
      const makeRequest = async () => {
        try {
          const response = await fetch(apiEndpoint);

          if (!response.ok) {
            const errorMessage = `Server error: ${response.status}`;
            console.error(errorMessage);
            return reject(new Error(errorMessage)); // Stop polling on server error
          }

          const data = await response.json();
          console.log("API response:", data);

          if (data.status === successResponse) {
            console.log("Success response received:", data);
            return resolve(data); // // Stop polling if success response
          }

          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < maxPollingDuration) {
            setTimeout(makeRequest, pollingInterval); // Schedule next request
            console.log("Still processing...");
          } else {
            console.log("Maximum polling duration reached. Stopping polling.");
            return resolve(null); // continue as a soft failure
          }
        } catch (error) {
          console.error("Error making API request:", error);
          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < maxPollingDuration) {
            setTimeout(makeRequest, pollingInterval); // Schedule next request
          } else {
            console.log("Maximum polling duration reached. Stopping polling.");
            resolve(null);
          }
        }
      };

      makeRequest(); // Start the first request
    });
  }

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
        setIsProcessing(true);
      } else if (fileCount > 1) {
        const formData = createFormData(data);
        sendFormData(formData);
        setFilenames("Processing " + fileCount + " file(s)...");
        fileInputRef.current.value = "";
        setIsProcessing(true);
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
    setIsProcessing(false);
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
