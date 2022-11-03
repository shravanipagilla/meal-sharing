import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddReservation from "./AddReservation";
import AddReview from "./AddReview";

const MealDetail = ({ meals }) => {
  const [unreserved, setUnreserved] = useState(null);

  useEffect(() => {
    console.log("reservation can added here");
    fetchItomReservation();
  }, []);

  const fetchItomReservation = async () => {
    try {
      const data = await fetch("api/meals?availableReservations=true");
      const eachReservationItem = await data.json();

      eachReservationItem.filter((eachItem) => {
        // @ts-ignore
        if (eachItem.id === Number(params.id)) {
          console.log(eachItem);
          //setReservation(eachItem.unreserved);
          setUnreserved(eachItem.unreserved);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const params = useParams();
  console.log(params);
  // @ts-ignore
  const meal = meals.find((meal) => meal.id === Number(params.id));
  console.log(meal);
  return (
    <div>
      <div className="mealItem">
        {!meal ? (
          <div>Meal Not Found</div>
        ) : (
          <div className="mealDetails" >
            <img
              src="https://i.ibb.co/fMVnBYH/imgdefault.jpg"
              width="250px"
              height="150px"
              alt="Meal Image"
            />
            <h1>{meal.title}</h1>
            <p>{meal.description}</p>
            <p>{meal.location}</p>
            <p>{meal.price} DKK</p>
            <p>Available Reservations: {unreserved}</p>
          </div>
        )}
      </div>
      <AddReservation />
    </div>
  );
};
export default MealDetail;