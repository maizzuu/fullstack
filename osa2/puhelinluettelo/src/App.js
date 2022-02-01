import React, { useState, useEffect } from "react";
import axios from "axios";
import NewPersonForm from "./components/NewPersonForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  useEffect(() => {
    service.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.filter((person) => person.name === newName);
    if (exists.length > 0) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      service.create(personObject).then((response) => {
        setPersons(persons.concat(personObject));
        setNewNumber("");
        setNewName("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a new person</h2>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <ShowPersons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
