import React, { useContext } from "react";
import { MyContext } from "../Context";
import Table from "../components/Table";

export default function Dashboard() {
  const context = useContext(MyContext);
  let rooms = context.filteredCheckedInRooms;
  const columns = ["Room", "Booked By", "Phone Number", "Action"];

  if (context.isAdmin) {
    return (
      <div className="container pt-5">
        <form>
          <div className="title my-2 text-center">
            <h4>List of Booked Rooms</h4>
          </div>
          <div className="row my-4">
            <div className="col-md-12 my-2">
              <input
                className="dashboard-input"
                name="searchKey"
                value={context.searchKey}
                type="text"
                placeholder="Enter room slug to search"
                onChange={(event) => context.searchBy(event)}
              ></input>
            </div>
          </div>
        </form>
        {rooms.length < 1 ? (
          <div>No Checkings</div>
        ) : (
          <Table columns={columns} data={rooms} checkout={context.checkout} />
        )}
      </div>
    );
  } else {
    return <h1>Not Authorized to View This Page</h1>;
  }
}
