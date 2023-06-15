import React from "react";

export const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.phone}
    </div>
  );
};
