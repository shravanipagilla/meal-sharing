import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/TestComponent/Footer";
import AddMeal from "./components/AddMeal";
import AddReview from "./components/TestComponent/AddReview";
import Meals from "./components/TestComponent/Meals";
import MealDetail from "./components/TestComponent/MealDetail";
import Home from "./components/TestComponent/Home";
import ContactUS from "./components/TestComponent/ContactUs";

function App() {
  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchMeal, setSearchMeal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fechedData();
    fetchedReviewData();
  }, [searchMeal]);

  const fechedData = () => {
    if (searchMeal == "") {
      fetch("/api/meals")
        .then((res) => res.json())
        .then((meals) => {
          setIsLoading(false);
          setMeals(meals);
        });
    } else {
      fetch(`/api/meals?title=${searchMeal}`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setMeals(data);
        });
    }
  };

  const fetchedReviewData = () => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((meals) => {
        const reviews = meals.map((meal) => {
          return {
            mealid: meal.meal_id,
            stars: meal.stars,
          };
        });
        setReviews(reviews);
      });
  };

  return (
    <Router>
      <Route exact path="/">
        <Header />
        <Home />
        <Footer />
      </Route>

      <Route exact path="/meals">
        <Header />
        <Meals
          meals={meals}
          setSearchMeal={setSearchMeal}
          searchMeal={searchMeal}
          isLoading={isLoading}
          reviews={reviews}
        />
        <Footer />
      </Route>

      <Route exact path="/meals/addMeal">
        <Header />
        <AddMeal />
        <Footer />
      </Route>

      <Route exact path="/meals/:id">
        <Header />
        <MealDetail meals={meals} />
        <Footer />
      </Route>

      <Route exact path="/meals/:id/mealReview">
        <Header />
        <AddReview />
        <Footer />
      </Route>

      <Route exact path="/ContactUs">
        <Header/>
        <ContactUS/>
        <Footer />
      </Route>
    </Router>
  );
}

export default App;
