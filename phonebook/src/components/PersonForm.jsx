import React from "react";

export const PersonForm = ({ setNewName, setPhone, addName }) => {
  return (
    <div>
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
    </div>
  );
};
