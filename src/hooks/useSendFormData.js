import { useState } from "react";
import { apiBase, endPoint } from "../config.js";

function useSendFormData() {
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingReady, setProcessingReady] = useState(false);
  const [estimatedSeconds, setEstimatedSeconds] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [uploadId, setUploadId] = useState(null);
  const [songData, setSongData] = useState(null);

  const sendFormData = async (data) => {
    fetch(`${apiBase}/process-edl`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        console.log("Upload successful:", data);
        setIsProcessing(true);
        let maxTimeout = 600000;
        if (data.song_count) {
          setSongCount(data.song_count);
          const estimatedSeconds = Math.round(data.song_count * 1.5); // Assuming 1.5 seconds per song
          maxTimeout = estimatedSeconds * 1000;
          setEstimatedSeconds(estimatedSeconds);
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
            if (result === null) {
              console.log("WARNING: Data is null - polling timed out!");
            }
            setSummaryData(result);
            setProcessingReady(true);
            setUploadId(data.upload_id);
            fetch_songs(data.upload_id);
          };
          startPolling();
        }
      })
      .catch((error) => {
        setError(error);
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
            return resolve(data);
          }

          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < maxPollingDuration) {
            setTimeout(makeRequest, pollingInterval); // Schedule next request
            console.log("Still processing...");
          } else {
            console.log("Maximum polling duration reached. Stopping polling.");
            setError(
              "Polling timed out after " +
                maxPollingDuration / 1000 +
                " seconds"
            );
            return resolve(null); // continue as a soft failure
          }
        } catch (error) {
          console.error("Error making API request:", error);
          setError("Error making API request: " + error.message);
          return resolve(null);
        }
      };

      makeRequest(); // Start the first request
    });
  }

  const fetch_songs = (uploadId) => {
    console.log("Fetching songs"); // this runs immediately
    fetch(`${apiBase}/songs?upload_id=${uploadId}`)
      .then((response) => {
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        setSongData(data);
        // const tbody = document.querySelector("#trackTableBody");
        // tbody.innerHTML = "";
        // let i = 0;
        // data.forEach((song) => {
        //   console.log("Song:", song);
        //   let rowId = `row-${i}`;
        //   i += 1;
        //   const row = document.createElement("tr");
        //   row.setAttribute("class", "song-rows");
        //   row.setAttribute("id", rowId);
        //   row.innerHTML = `
        //     <td class="show-tablet">${song.file_name || ""}</td>
        //     <td>${song.songs || ""}</td>
        //     <td>${song.title || ""}</td>
        //     <td>${capitalizeWords(song.library) || ""}</td>
        //     <td class="show-desktop">${song.composer || ""}</td>
        //     <!-- <td class="show-tablet">${
        //       formatTime(song.duration) || ""
        //     }</td> -->
        //     <td class="show-desktop">${song.bpm || ""}</td>
        //     <td class="show-desktop">${song.mix || ""}</td>
        //     <td>${formatTime(song.total_time_played) || ""}</td>
        //   `;
        //   tbody.appendChild(row);
        //   fileNameElement.textContent =
        //     "Finished processing " + fileNames.length + " files!";
        //   processBtn.textContent = "Process";
        // });
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  };

  return {
    sendFormData,
    isProcessing,
    processingReady,
    estimatedSeconds,
    summaryData,
    error,
    songCount,
    songData,
  };
}
export default useSendFormData;
