import "./DownloadSection.css";
import { apiBase, endPoint } from "../config.js";
import { useState } from "react";

function DownloadSection({ uploadId, processingReady, error, setError }) {
  const [downloadError, setDownloadError] = useState(null);
  const handleDownloadClick = async () => {
    setDownloadError(null);
    const response = await fetch(
      `${apiBase}/download-result?upload_id=${uploadId}`
    );
    if (!response.ok) {
      setDownloadError(
        "Something went wrong when download the result. Please try again later"
      );
      return;
    } else {
      try {
        const blob = await response.blob();
        // Extract filename from Content-Disposition header
        const contentDisposition = response.headers.get("Content-Disposition");
        const filename = contentDisposition
          ? contentDisposition.split("filename=")[1].replace(/"/g, "")
          : "cueref_export.xlsx"; // fallback

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        setDownloadError(
          "Something went wrong when download the result. Please try again later"
        );
      }
    }
  };

  return (
    <section className="download-section">
      <button
        onClick={handleDownloadClick}
        id="downloadButton"
        className="button"
      >
        Download Metadata
      </button>
      {downloadError ? (
        <p style={{ marginTop: "10px" }}>{downloadError}</p>
      ) : (
        ""
      )}
    </section>
  );
}

export default DownloadSection;
