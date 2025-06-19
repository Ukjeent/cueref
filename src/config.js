const isLocalhost = ["localhost", "127.0.0.1"].includes(
  window.location.hostname
);

export const apiBase = isLocalhost
  ? "http://localhost:8000"
  : "https://cueref-backend-1.onrender.com";

export const endPoint = `${apiBase}/upload-info?upload_id=`;
