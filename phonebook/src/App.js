import { useState, useEffect } from "react";
import { PersonForm } from "./components/PersonForm";
import { DisplayBook } from "./components/DisplayBook";
import personService from "./services/persons";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const addPerson = (newObject) => {
    personService.create(newObject).then((res) => {
      setPersons(persons.concat(res.data));
    });
  };
  const addName = (e) => {
    e.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : addPerson({ name: newName, number });
    setNewName("");
  };
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        setNewName={setNewName}
        setPhone={setNumber}
        addName={addName}
      />
      <h2>Numbers</h2>
      <DisplayBook persons={persons} />
    </div>
  );
};

export default App;
