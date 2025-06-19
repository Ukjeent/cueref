import "./TableSection.css";
import { useAccordionButton } from "react-bootstrap";
import { useState } from "../App.jsx";

function TableSection() {
  const [trackTableBody, setTrackTableBody] = useState("");
  const [fileName, setFileName] = useState("fileName");
  const [songs, setSongs] = useState(0);
  const [title, setTitle] = useState("title");
  const [library, setLibrary] = useState("library");
  const [composer, setComposer] = useState("composer");
  const [bpm, setBpm] = useState(0);
  const [mix, setMix] = useState("mix");
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);

  const addTracks = () => {
    const tbody = document.querySelector("#trackTableBody");
    tbody.innerHTML = "";

    // for (let i = 0; i < 1; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="show-tablet">Filename</td>
            <td>Songs</td>
            <td>Title</td>
            <td>{capitalizeWords("library")}</td>
            <td class="show-desktop">Composer</td>
            <td class="show-desktop">Bpm</td>
            <td class="show-desktop">Mix</td>
            <td>{formatTime("360")}</td>`;
    tbody.appendChild(row);
    // }

    setTrackTableBody(tbody);
  };

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
        <tbody id="trackTableBody"></tbody>
        {trackTableBody}
      </table>
    </section>
  );
}

export default TableSection;
