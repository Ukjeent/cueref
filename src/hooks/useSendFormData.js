import { useState } from "react";
import { apiBase, endPoint } from "../utils/config.js";
import { useAuthContext } from "../contexts/AuthContext";

function useSendFormData(
  isProcessing,
  setIsProcessing,
  processingReady,
  setProcessingReady,
  uploadId,
  setUploadId,
  setError,
  setModalShow
) {
  const { token, userLogout } = useAuthContext();
  const [summaryData, setSummaryData] = useState(null);
  const [estimatedSeconds, setEstimatedSeconds] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [songData, setSongData] = useState(null);

  const sendFormData = async (data) => {
    fetch(`${apiBase}/process-edl`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => {
        if (response.status === 401) {
          // Token expired/invalid - log user out
          userLogout();
          setModalShow(true);
          setIsProcessing(false);
          throw new Error("Session expired. Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        let maxTimeout = 600000;
        if (data.song_count) {
          setSongCount(data.song_count);
          const estimatedSeconds = Math.round(data.song_count * 1.5); // Assuming 1.5 seconds per song
          maxTimeout = estimatedSeconds * 1000;
          setEstimatedSeconds(estimatedSeconds);
        }

        if (data && data.upload_id) {
          const startPolling = async () => {
            const result = await pollApi(
              endPoint,
              "completed",
              5000,
              maxTimeout,
              data.upload_id
            );
            if (result === null) {
              console.log("WARNING: Data is null - polling timed out!");
            }
            setSummaryData(result);
            setProcessingReady(true);
            setIsProcessing(false);
            setUploadId(data.upload_id);
            fetch_songs(data.upload_id);
          };
          startPolling();
        }
      })
      .catch((error) => {
        setError(error);
        setIsProcessing(false);
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

          if (data.status === successResponse) {
            return resolve(data);
          }

          const elapsedTime = Date.now() - startTime;

          if (elapsedTime < maxPollingDuration) {
            setTimeout(makeRequest, pollingInterval); // Schedule next request
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
    fetch(`${apiBase}/songs?upload_id=${uploadId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSongData(data);
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
    songCount,
    songData,
  };
}
export default useSendFormData;
