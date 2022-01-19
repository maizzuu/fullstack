import React from "react";

const ShowPersons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <p key={person.name}>
          <b>{person.name}</b> {person.number}
        </p>
      ))}
    </div>
  );
};

export default ShowPersons;
