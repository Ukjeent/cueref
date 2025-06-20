// const apiBase = "https://cueref-backend-1.onrender.com";
const isLocalhost = ["localhost", "127.0.0.1"].includes(
  window.location.hostname
);
const apiBase = isLocalhost
  ? "http://localhost:8000"
  : "https://cueref-backend-1.onrender.com";

const fileInput = document.querySelector("#fileInput");
const endPoint = `${apiBase}/upload-info?upload_id=`;

let fileNames = [];
fileNameElement = document.querySelector("#fileNameDisplay");
fileNameTextContent = "Files uploaded: ";
fileNameString = "";
processBtn = document.querySelector("#processButton");
fileProcessingDisplay = document.querySelector("#fileProcessingDisplay");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length >= 1) {
    for (let i = 0; i < fileInput.files.length; i++) {
      fileNames.push(fileInput.files[i].name);
    }
    if (fileNames.length >= 1) {
      for (let i = 0; i < fileNames.length; i++) {
        if (i === fileNames.length - 1) {
          fileNameString += fileNames[i];
        } else {
          fileNameString += fileNames[i] + " / ";
        }
      }
      fileNameTextContent += fileNameString;
      fileNameElement.textContent = fileNameTextContent;
    }
  }
});

fileInput.addEventListener("click", () => {
  fileNameElement.style.color = "#999";
  fileNameElement.textContent = "";
  fileNames = [];
  fileNameString = "";
  fileNameTextContent = "Files uploaded: ";
  processBtn.textContent = "Process";
});

processBtn.addEventListener("click", (e) => {
  if (fileInput.files.length === 0) {
    fileNameElement.textContent = "No files selected, please upload a file";
    fileNameElement.style.color = "#ff4545";
  } else {
    console.log("Processing files");
    const tbody = document.querySelector("#trackTableBody");
    tbody.innerHTML = "";
    document.querySelector(".summary-section-wrapper").style.display = "none";

    const formData = new FormData();
    const frames = document.querySelector("#frameRate").value;
    formData.append("frames", frames);
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    sendFormData(formData);

    if (fileInput.files.length > 0) {
      fileNameElement.style.color = "#999";
      processBtn.textContent = "Processing";
      fileInput.value = "";
    }

    // if (fileInput.files.length === 1) {
    //   fileNameElement.style.color = "#999";
    //   processBtn.textContent = "Processing";
    //   fileNameElement.textContent =
    //     "Processing " + fileNames.length + " file - please wait!";
    //   fileInput.value = "";
    // } else if (fileInput.files.length > 1) {
    //   fileNameElement.style.color = "#999";
    //   processBtn.textContent = "Processing";
    //   fileNameElement.textContent =
    //     "Processing " +
    //     fileNames.length +
    //     " files - please wait! Note that this may take several minutes depending on file size.";
    //   fileInput.value = "";
    // }
  }
});

function sendFormData(data) {
  fetch(`${apiBase}/process-edl`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Upload successful:", data);
      let maxTimeout = 600000;
      if (data.song_count) {
        const estimatedSeconds = Math.max(120, data.song_count * 2.5);
        maxTimeout = estimatedSeconds * 1000;
        const estimatedMinutes = Math.ceil(estimatedSeconds / 60);
        fileNameElement.style.color = "#999";
        fileNameElement.textContent = `Processing ${data.song_count} songs - estimated time: ${estimatedMinutes} minutes on our development server during beta testing`;
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
          updateSummarySection(result);
          fetch_songs(data.upload_id);
        };
        startPolling();
      }
    })
    .catch((error) => {
      console.error("Upload failed:", error);
    });
}

function fetch_songs(uploadId) {
  console.log("Fetching songs"); // this runs immediately
  fetch(`${apiBase}/songs?upload_id=${uploadId}`)
    .then((response) => {
      console.log("Response:", response);
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("#trackTableBody");
      tbody.innerHTML = "";
      let i = 0;
      console.log("test:", data);
      data.forEach((song) => {
        console.log("Song:", song);
        let rowId = `row-${i}`;
        i += 1;
        const row = document.createElement("tr");
        row.setAttribute("class", "song-rows");
        row.setAttribute("id", rowId);
        row.innerHTML = `
            <td class="show-tablet">${song.file_name || ""}</td>
            <td>${song.songs || ""}</td>
            <td>${song.title || ""}</td>
            <td>${capitalizeWords(song.library) || ""}</td>
            <td class="show-desktop">${song.composer || ""}</td>
            <!-- <td class="show-tablet">${
              formatTime(song.duration) || ""
            }</td> -->
            <td class="show-desktop">${song.bpm || ""}</td>
            <td class="show-desktop">${song.mix || ""}</td>
            <td>${formatTime(song.total_time_played) || ""}</td>
          `;
        tbody.appendChild(row);
        fileNameElement.textContent =
          "Finished processing " + fileNames.length + " files!";
        processBtn.textContent = "Process";
      });
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function updateSummarySection(data) {
  const filesLoaded = document.querySelector("#fileCount");
  filesLoaded.textContent = `Files loaded: ${data.files ?? 0}`;

  const matchedCues = document.querySelector("#matchedCuesCount");
  matchedCues.textContent = `Matched cues: ${data.matchedCues ?? 0}`;

  const unmatchedCues = document.querySelector("#unmatchedCuesCount");
  unmatchedCues.textContent = `Unmatched cues: ${data.unmatchedCues ?? 0}`;

  const libraryCount = document.querySelector("#libraryCount");
  libraryCount.textContent = `Libraries: ${data.libraries ?? 0}`;

  const framesDisplay = document.querySelector("#frames-display");
  framesDisplay.textContent = `Frames: ${data.frames ?? "-"} fps`;

  document.querySelector(".summary-section-wrapper").style.display = "flex";
}

function formatTime(seconds) {
  if (seconds === null || seconds === undefined || seconds <= 0) {
    return "";
  }
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const capitalizeWords = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
