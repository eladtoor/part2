import React from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </div>
  );
};
