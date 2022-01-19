import React from "react";
import Country from "./Country";

const ShowCountries = ({ countries, filter }) => {
  if (filter === "") {
    return null;
  } else {
    if (countries.length > 10) {
      return <div>Too many matches</div>;
    }
    if (countries.length === 1) {
      return (
        <div>
          <Country country={countries[0]} />
        </div>
      );
    }
    if (1 < countries.length < 10) {
      return (
        <div>
          {countries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        </div>
      );
    }
  }
};

export default ShowCountries;
