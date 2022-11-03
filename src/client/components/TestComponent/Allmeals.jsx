// @ts-nocheck
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Allmeals() {
  const [meals, allMeals] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    fetch("/api/meals")
      .then((response) => response.json())
      .then((response) => allMeals(response))
      .then(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <p>loading....</p>}
      {allMeals.length === 0 ? (
        <p>No Results</p>
      ) : (
        <ul>
          {meals.map((meal) => {
            return (
              <li key={meal.id}>
                <h2>Title: {meal.title}</h2>
                <p>Description: {meal.description}</p>
                <p>Price: {meal.price}</p>
              </li>
            );
          })}
        </ul>
      )}
      
    </>
  );
}

/*export default function TestComponent() {
  const [meals, setMeals] = useState([]);

  fetch("api/meals") //api for the get request
    .then((response) => response.json())
    .then((data) => setMeals(data));

  const renderMeals = () => {
    meals.map((meal) => {
      return (
        <ul>
          <li key={meal.id}>
            <h2>Title: {meal.title}</h2>
            <p>Description: {meal.description}</p>
            <p>Price; {meal.price}</p>
          </li>
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
}*/
