import React from "react";
import { Person } from "./Person";

export const DisplayBook = ({ persons, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Person person={person} />{" "}
            <button onClick={() => deletePerson(person.id)}>
              {" "}
              delete person
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
