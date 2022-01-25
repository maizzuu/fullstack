import React from "react";
import Country from "./Country";
import Weather from "./Weather";

const ShowCountries = ({ countries, filter, setNewFilter }) => {
  const handleClick = (countryName) => {
    setNewFilter(countryName);
  };

  if (filter === "") {
    return null;
  } else {
    if (countries.length > 10) {
      console.log("more than ten");
      return <div>Too many matches</div>;
    }
    if (countries.length === 1) {
      return (
        <div>
          <Country country={countries[0]} />
          <Weather
            capital={countries[0].capital[0]}
            country={countries[0].name.common}
          />
        </div>
      );
    }
    if (countries.length < 10) {
      console.log("less than ten");
      return (
        <div>
          {countries.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleClick(country.name.common)}>
                show
              </button>
            </p>
          ))}
        </div>
      );
    }
  }
};

export default ShowCountries;
