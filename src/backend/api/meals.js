// @ts-nocheck
const express = require("express");
//const { max, sum } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  let meals = knex("Meal");
  const queryString = request.query;

  // 1.maxPrice	Number	Returns all meals that are cheaper than maxPrice.	api/meals?maxPrice=90
  if ("maxPrice" in queryString) {
    meals = meals.where("price", "<=", queryString.maxPrice);
  }
  // 2.availableReservations api/meals?availableReservations=true
  if ("availableReservations" in queryString) {
    if (!["true", "false"].includes(queryString.availableReservations)) {
      response
        .status(400)
        .json({ error: "availableReservations must be either True or False" });
      return;
    }
    if (queryString.availableReservations === "true") {
      // If max_reservations is null, I assume it means that we can make an unlimited amount of reservations.
      meals = meals
        .leftJoin("Reservation", "Reservation.meal_id", "Meal.id")
        .groupBy("Meal.id")
        .havingRaw(
          "max_reservations IS NULL OR SUM(COALESCE(Reservation.number_of_guests, 0)) < max_reservations"
        );
    } else {
      meals = meals
        .groupBy("Meal.id")
        .leftJoin("Reservation", "Reservation.meal_id", "Meal.id")
        .havingRaw("SUM(Reservation.number_of_guests) >= max_reservations");
    }
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

// 1.Returns all meals

router.get("/meals", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

// 4.PUT	Updates the meal by id

router.put("/:id", async (req, res) => {
  const putData = req.body;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const count = await knex("Meal").where("id", req.params.id).update({
      title: putData.title,
      description: putData.description,
      location: putData.loc,
      when: putData.when,
      max_reservations: putData.max_res,
      price: putData.price,
      created_date: putData.created_date,
    });
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating new post", error: error });
  }
});

// 5.DELETE	  Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("Meal").where("id", req.params.id).del();
    if (deleted) {
      res.status(200).json({ updated: deleted });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating new post", error: error });
  }
});

module.exports = router;
