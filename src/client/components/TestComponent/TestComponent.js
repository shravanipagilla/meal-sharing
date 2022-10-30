/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./testComponentStyle.css";

export default function TestComponent() {
  const [meals, setMeals] = useState([]);
  fetch("url") //api for the get request
    .then((response) => response.json())
    .then((data) => setMeals(data));

  const renderMeals = () => {
    meals.map((meal) => {
      return (
        <ul>
          <li>{meal}</li>
        </ul>
      );
    });
  };
  return (
    <div>
      <header className="header">
        <h1 className="title">Meal_sharing </h1>
        <img className="logo" src="../../assets/images/logo.png" alt="logo" />
      </header>

      <div className="body">
        <>
          <p>Meals</p>
          {renderMeals}
        </>
      </div>
      <footer></footer>
    </div>
  );
}
