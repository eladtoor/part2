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
    let id;
    if (
      persons.some((person) => {
        id = person.id;
        return person.name === newName;
      })
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        let newObject = { name: newName, number: number, id: id };
        personService.updateNumber(id, newObject).then((res) => {
          console.log(res.data);
          setPersons(
            persons.map((person) => (id !== person.id ? person : res.data))
          );
        });
      }
    } else addPerson({ name: newName, number });
    setNewName("");
  };
  const deletePerson = (id) => {
    const person = persons.find((person) => id === person.id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then((res) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
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
      <DisplayBook persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
