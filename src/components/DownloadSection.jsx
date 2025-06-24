import "./DownloadSection.css";
import { apiBase, endPoint } from "../config.js";

function DownloadSection({ uploadId, processingReady, error, setError }) {
  const handleDownloadClick = async () => {
    const response = await fetch(
      `http://localhost:8000/download-result?upload_id=${uploadId}`
    );

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
    </section>
  );
}

export default DownloadSection;
