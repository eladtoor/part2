import React from "react";
import { Person } from "./Person";

export const DisplayBook = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Person person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
};
