import "./TableSection.css";
import { useAccordionButton } from "react-bootstrap";
import { useState } from "react";

function TableSection({ songData, processingReady }) {
  const [trackTableBody, setTrackTableBody] = useState("");
  const [fileName, setFileName] = useState("fileName");

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined || seconds <= 0) {
      return "";
    }
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <section className="table-section">
      <table id="trackTable" className="track-table">
        <thead>
          <tr>
            <th className="show-tablet">File</th>
            <th>Songs</th>
            <th>Title</th>
            <th>Library</th>
            <th className="show-desktop">Composer</th>
            <th className="show-desktop">BPM</th>
            <th className="show-desktop">Mix</th>
            <th>Playtime</th>
          </tr>
        </thead>
        <tbody id="trackTableBody">
          {songData ? (
            songData.map((songData, index) => (
              <tr key={index} className="song-rows">
                <td className="show-tablet">{songData.file_name}</td>
                <td>{songData.songs}</td>
                <td>{songData.title}</td>
                <td>{capitalizeWords(songData.library)}</td>
                <td className="show-desktop">{songData.composer}</td>
                <td className="show-desktop">{songData.bpm}</td>
                <td className="show-desktop">{songData.mix}</td>
                <td>{formatTime(songData.total_time_played)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TableSection;
