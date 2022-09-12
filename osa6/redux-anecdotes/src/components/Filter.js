import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginBottom: 20 }}>
      filter:{" "}
      <input
        type="text"
        name="filter"
        onChange={(event) => dispatch(setFilter(event.target.value))}
      />
    </div>
  );
};

export default Filter;
