import React from "react";

const TableBody = ({ rooms, checkout }) => {
  const rows = rooms.map((room, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{room.room_slug}</td>
      <td>{room.customer_name}</td>
      <td>{room.phone_number}</td>
      <td>
          <button onClick={() => checkout(room.room_id)} className="btn btn-outline-dark">Checkout</button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
};

export default TableBody;
