import "./Pageination.css";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

function PaginationElement({
  pages,
  active,
  setActive,
  uploadId,
  fetch_songs,
  songRows,
}) {
  function handlePageChange(event) {
    setActive(Number(event.target.textContent));
    fetch_songs(uploadId, Number(event.target.textContent));
  }
  const items = [];

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        onClick={handlePageChange}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="pagination-container">
      <Pagination size="sm">{items}</Pagination>
      <div className="pagination-info">
        Showing page {active} of {pages} ({songRows} total rows)
      </div>
    </div>
  );
}

export default PaginationElement;
