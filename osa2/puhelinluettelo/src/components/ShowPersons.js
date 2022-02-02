import React from "react";
import Person from "./Person";

const ShowPersons = ({ personsToShow, remove }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleRemove={remove}
          id={person.id}
        />
      ))}
    </div>
  );
};

export default ShowPersons;
