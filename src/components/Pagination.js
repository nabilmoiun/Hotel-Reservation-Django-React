import React from "react";

const Pagination = ({ totalNumberofRooms, roomsPerPage, paginate }) => {
  let pages = [];
  for (
    let page = 1;
    page <= Math.ceil(totalNumberofRooms / roomsPerPage);
    page++
  ) {
    pages.push(page);
  }
  return (
      <>
      <div className="container">
      <ul className="pagination pagination-lg">
        {pages.map((page) => (
          <li
            className="page-item text-decoration-none"
            key={page}
            onClick={() => paginate(page)}
            role="button"
          >
            {page}
          </li>
        ))}
      </ul>
      </div>
      </>
  );
};

export default Pagination;
