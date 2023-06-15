import { useState } from "react";
import { PersonForm } from "./components/PersonForm";
import { DisplayBook } from "./components/DisplayBook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "0529329322" },
  ]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const addName = (e) => {
    e.preventDefault();
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, phone: phone }));
    setNewName("");
  };
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
