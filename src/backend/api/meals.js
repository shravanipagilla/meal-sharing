// @ts-nocheck
const express = require("express");
//const { max, sum } = require("../database");
const router = express.Router();
const knex = require("../database");

// 1.maxPrice	Number	Returns all meals that are cheaper than maxPrice.	api/meals?maxPrice=90
router.get("/", async (request, response) => {
  let meals = knex("Meal").join(
    "Reservation",
    "Reservation.meal_id",
    "=",
    "Meal.id"
  );
  const queryString = request.query;
  // 1.maxPrice
  if ("maxPrice" in queryString) {
    meals = meals.where("price", "<=", queryString.maxPrice);
  }
  // 2.availableReservations api/meals?availableReservations=true
  if ("availableReservations" in queryString) {
    meals = meals
      .sum({ guests: "Reservation.number_of_guests" })
      .groupBy("Reservation.meal_id")
      .having("Meal.max_reservations", ">", `{guests}`);

    console.log("SQL:" + meals.toSQL().sql);
  }
  // 3.title  like api/meals?title=Indian%20platter
  if ("title" in queryString) {
    const isTitle = queryString.title;
    if (isTitle) {
      meals = meals.where("title", "like", `%${queryString.title}%`);
    }
  }
  // 4.dateAfter like api/meals?dateAfter=2022-10-01
  if ("dateAfter" in queryString) {
    const givenDate = new Date(queryString.dateAfter);
    meals = meals.where("when", ">", givenDate);
  }
  // 5.dateBefore like api/meals?dateBefore=2022-08-08
  if ("dateBefore" in queryString) {
    const givenDate = new Date(queryString.dateBefore);
    meals = meals.where("when", "<=", givenDate);
  }
  //6.limit like api/meals?limit=7
  if ("limit" in queryString) {
    const givenLimit = Number(queryString.limit);
    if (!isNaN(givenLimit)) {
      meals = meals.limit(givenLimit);
    }
  }
  // 7.sort_key like api/meals?sort_key=price
  if ("sort_key" in queryString && !("sort_dir" in queryString)) {
    const isSort_key = queryString.sort_key;
    meals = meals.orderBy(isSort_key);
  }
  // 8.sort_key like api/meals?sort_key=price&sort_dir=desc
  if ("sort_key" in queryString && "sort_dir" in queryString) {
    const isSort_key = queryString.sort_key;
    const sortDir = queryString.sort_dir;
    meals = meals.orderBy(isSort_key);
  }

  try {
    const mealsData = await meals.select(["Meal.*"]);
    if (mealsData.length !== 0) {
      response.json(mealsData);
    } else {
      response.status(404).json({ Message: "No Data Found" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
