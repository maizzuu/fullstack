import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  return (
    <div style={{ marginBottom: 20 }}>
      filter:{" "}
      <input
        type="text"
        name="filter"
        onChange={(event) => props.setFilter(event.target.value)}
      />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
