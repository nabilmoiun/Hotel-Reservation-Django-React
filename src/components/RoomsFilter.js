import React, { useContext } from "react";
import { MyContext } from "../Context";

export const getUniqueValues = (rooms, type) => {
  return [...new Set(rooms.map((room) => room[type]))];
};

export default function RoomsFilter() {
  const contextData = useContext(MyContext);
  const {
    rooms,
    category_name,
    handleChange,
    capacity,
    price_per_night,
    maxPrice,
    minPrice,
    // minRoomSize,
    // maxRoomSize,
    reserved,
  } = contextData;

  let roomTypes = ["all", ...getUniqueValues(rooms, "category_name")];
  const selectTypes = roomTypes.map((cat, index) => (
    <option key={index} value={cat}>
      {cat}
    </option>
  ));

  let capacityValues = [...getUniqueValues(rooms, "capacity")];
  const sleectCapacity = capacityValues.sort().map((cap, index) => (
    <option key={index} value={cap}>
      {cap}
    </option>
  ));
  return (
    <>
      <form className="rooms-filter">
        <div className="form-group">
          <label htmlFor="inputCategory">Category</label>
          <select
            id="inputCategory"
            className="form-control"
            name="category_name"
            value={category_name}
            onChange={handleChange}
          >
            {selectTypes}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inputCapacity">Capacity</label>
          <select
            id="inputCapacity"
            className="form-control"
            name="capacity"
            value={capacity}
            onChange={handleChange}
          >
            {sleectCapacity}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customRange3">
            Room Cost Max ${price_per_night}
          </label>
          <input
            name="price_per_night"
            value={price_per_night}
            type="range"
            className="custom-range pt-2"
            min={minPrice}
            max={maxPrice}
            step="1.0"
            id="customRange3"
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="minRoomsSize">Room Size Min</label>
          <input
            name="minRoomSize"
            value={minRoomSize}
            type="number"
            className="form-control"
            id="minRoomSize"
            onChange={handleChange}
            // style={{"width": "100px"}}
          />
        </div> */}

        {/* <div className="form-group">
          <label htmlFor="maxRoomSize">Room Size Max</label>
          <input
            name="maxRoomSize"
            value={maxRoomSize}
            type="number"
            className="form-control"
            id="maxRoomSize"
            onChange={handleChange}
            // style={{"width": "100px"}}
          />
        </div> */}

        <div className="form-check pt-4">
          <input
            name="reserved"
            checked={reserved}
            type="checkbox"
            className="form-check-input"
            id="reserved"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Available
          </label>
        </div>

        {/* <div className="border">Facility</div> */}
      </form>
    </>
  );
}
