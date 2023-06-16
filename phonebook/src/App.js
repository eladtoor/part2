import { useState, useEffect } from "react";
import { PersonForm } from "./components/PersonForm";
import { DisplayBook } from "./components/DisplayBook";
import personService from "./services/persons";

import axios from "axios";
import { Message } from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState({});

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
          setPersons(
            persons.map((person) => (id !== person.id ? person : res.data))
          );
          setMessage(`Updated ${newName}`);
          setMessageStyle({
            color: "green",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginbottom: 10,
          });
          setTimeout(() => {
            setMessage("");
            setMessageStyle(null);
          }, 5000);
        });
      }
    } else {
      addPerson({ name: newName, number });
      setMessageStyle({
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginbottom: 10,
      });
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage("");
        setMessageStyle(null);
      }, 5000);
    }
    setNewName("");
  };
  const deletePerson = (id) => {
    const person = persons.find((person) => id === person.id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then((res) => setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          console.log(err);
          setMessageStyle({
            color: "red",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          });
          setMessage(`${person.name} Already deleted`);
          setTimeout(() => {
            setMessage("");
            setMessageStyle(null);
          }, 5000);
        });
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
      <Message message={message} messageStyle={messageStyle} />
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
