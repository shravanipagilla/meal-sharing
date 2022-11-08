import React from "react";
import { Link } from "react-router-dom";
import AddMeal from "../AddMeal";
// @ts-ignore
import { FaSearch } from "react-icons/fa";

const Meals = ({ meals, setSearchMeal, searchMeal, isLoading, reviews }) => {
  console.log(reviews);
  const reviewsWithMeals = (meal_id) => {
    const ratings = reviews
      .filter((review) => {
        return review.mealid === meal_id;
      })
      .map((star) => star.stars);
    //calculating the total ratings
    const totalRatings = ratings.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    //average of the ratings
    const averageRatings = Math.ceil(totalRatings / ratings.length);
    return averageRatings;
  };
  const imgArray = [
    "https://i.ibb.co/0YBmRMm/imgorder1.jpg",
    "https://i.ibb.co/tYB4HsV/imgorder2.png",
    "https://i.ibb.co/kxb7szg/imgorder3.jpg",
    "https://i.ibb.co/T2jnxMj/imgorder4.png",
    "https://i.ibb.co/mSXcHrD/imgorder5.jpg",
    "https://i.ibb.co/TwLPb9r/imgorder6.jpg",
    "https://i.ibb.co/wdZ6pYy/imgorder7.jpg"
  ];

  return (
    <div>
      {isLoading ? (
        <div>LOADING....</div>
      ) : (
        <div className="search_input_box">
          <input
            className="search_input"
            type="text"
            placeholder="search for  meal..."
            value={searchMeal}
            onChange={(e) => setSearchMeal(e.target.value)}
          />
          <FaSearch />
        </div>
      )}

      <div className="row">
        {meals.map((meal, id) => (
          <div key={meal.id} className="column">
            <div className="card">
              <img
                className="meals-image"
                src={
                  imgArray[meal.id - 1]
                    ? imgArray[meal.id - 1]
                    : "https://i.ibb.co/fMVnBYH/imgdefault.jpg"
                }
                alt="Meal Image"
                height="200px"
                width="320px"
              />
              <Link to={`/meals/${meal.id}`}>
                <h1>{meal.title}</h1>
              </Link>
              <hr />
              <h3>{meal.price} DKK</h3>
              <hr />
              {reviewsWithMeals(meal.id) ? (
                <div className="starRatingInput">
                  <span
                    className={
                      reviewsWithMeals(meal.id) >= 1 ? "highlighted" : ""
                    }
                  >
                    {" "}
                  </span>
                  <span
                    className={
                      reviewsWithMeals(meal.id) >= 2 ? "highlighted" : ""
                    }
                  >
                    {" "}
                  </span>
                  <span
                    className={
                      reviewsWithMeals(meal.id) >= 3 ? "highlighted" : ""
                    }
                  >
                    {" "}
                  </span>
                  <span
                    className={
                      reviewsWithMeals(meal.id) >= 4 ? "highlighted" : ""
                    }
                  >
                    {" "}
                  </span>
                  <span
                    className={
                      reviewsWithMeals(meal.id) >= 5 ? "highlighted" : ""
                    }
                  >
                    {" "}
                  </span>
                </div>
              ) : (
                <div>
                  <h3 style={{ textAlign: "center" }}>No reviews</h3>
                </div>
              )}

              <Link to={`/meals/${meal.id}/mealReview`}>
                <div>
                  <button className="ReviewButton">Add review</button>
                </div>
              </Link>
              <Link to={`/meals/${meal.id}`}>
                <div>
                  <button className="ReviewButton">Book Meal</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AddMeal />
    </div>
  );
};
export default Meals;
