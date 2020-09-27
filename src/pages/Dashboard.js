import React, { useContext } from "react";
import { MyContext } from "../Context";
// import { Link } from "react-router-dom";
import Table from "../components/Table";

export default function Dashboard() {
  // const [searchKey, setSerchKey] = useState("");
  const context = useContext(MyContext);
  console.log(context.checkedInRooms);
  let rooms = context.checkedInRooms;
  const columns = ["Room", "Booked By", "Phone Number", "Action"];

  // useEffect(() => {
  //   console.log("filtering by ", searchKey);
  //   rooms = rooms.filter(room => room.room_slug.includes(searchKey));
  //   console.log("filtered", rooms);
  // }, [searchKey])

  if (context.isAdmin) {
    return (
      <div className="container pt-5">
        {/* <div className="row">
          <input type="text" value={searchKey} placeholder="search" onChange={(event) => setSerchKey(event.target.value)}/>
        </div> */}
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
