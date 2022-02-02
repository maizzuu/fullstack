import React, { useState, useEffect } from "react";
import NewPersonForm from "./components/NewPersonForm";
import Filter from "./components/Filter";
import ShowPersons from "./components/ShowPersons";
import Notification from "./components/Notification";
import service from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
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
      if (
        window.confirm(
          `${newName} is already in the phonebook, do you want to replace the old number?`
        )
      ) {
        const personObject = {
          name: exists[0].name,
          number: newNumber,
          id: exists[0].id,
        };
        service.update(personObject.id, personObject).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id != personObject.id ? person : response
            )
          );
          setNewNumber("");
          setNewName("");
          setErrorMessage(`Updated ${newName}`);
          setTimeout(() => setErrorMessage(null), 4000);
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      service.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setNewNumber("");
        setNewName("");
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => setErrorMessage(null), 4000);
      });
    }
  };

  const removePerson = (id) => {
    const persontoRemove = persons.filter((p) => p.id === id)[0];
    if (window.confirm(`Delete ${persontoRemove.name}?`)) {
      service.remove(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
        setErrorMessage(`Removed ${persontoRemove.name}`);
        setTimeout(() => setErrorMessage(null), 4000);
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
      <Notification message={errorMessage} />
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
      <ShowPersons personsToShow={personsToShow} remove={removePerson} />
    </div>
  );
};

export default App;
