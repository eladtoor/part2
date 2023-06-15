import { useState } from "react";

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
      <form>
        <div>
          name:{" "}
          <input
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          phone:{" "}
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={addName} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
