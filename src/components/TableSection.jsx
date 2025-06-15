import "./TableSection.css";

function TableSection() {
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
      </table>
    </section>
  );
}

export default TableSection;
