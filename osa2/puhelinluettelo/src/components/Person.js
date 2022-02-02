import React from "react";

const Person = ({ name, number, handleRemove, id }) => {
  return (
    <div>
      <p>
        <b>{name}</b> {number}{" "}
        <button onClick={() => handleRemove(id)}>delete</button>
      </p>
    </div>
  );
};

export default Person;
