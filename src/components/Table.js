import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
const Table = ({ columns, data, checkout }) => {
  return (
    <div className="table-responsive-md">
      <table className="table table-hover">
        <TableHead headList={columns} />
        <TableBody rooms={data} checkout={checkout} />
      </table>
    </div>
  );
};

export default Table;
