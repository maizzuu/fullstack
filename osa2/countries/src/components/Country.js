import React from "react";

const Country = ({ country }) => {
  const capitals = country.capital;
  const languages = Object.values(country.languages);
  const imagesrc = country.flags.png;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <b>capital:</b> {capitals.join(", ")}
        <br />
        <b>population:</b> {country.population}
        <h2>languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={imagesrc} width="150px" height="auto"></img>
      </div>
    </div>
  );
};

export default Country;
