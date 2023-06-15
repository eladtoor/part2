import { useState, useEffect } from "react";
import { PersonForm } from "./components/PersonForm";
import { DisplayBook } from "./components/DisplayBook";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const addName = (e) => {
    e.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: phone }));
    setNewName("");
  };
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log(persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        setNewName={setNewName}
        setPhone={setPhone}
        addName={addName}
      />
      <h2>Numbers</h2>
      <DisplayBook persons={persons} />
    </div>
  );
};

export default App;
