const express = require("express");
const router = express.Router();
const knex = require("../database");

// 1./api/reviews	GET	Returns all reviews.
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const title = await knex("Review").select("*");
    if (title.length !== 0) {
      response.send(title);
    } else {
      response.status(400).json({ Message: "No Reviews Found" });
    }
  } catch (error) {
    throw error;
  }
});

// 2./api/reviews/:meal_id/reviews	GET	Returns all reviews for a specific meal
router.get("/:meal_id/reviews", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows = await knex("Review")
      .select("*")
      .where("meal_id", request.params.meal_id);
    if (rows.length !== 0) {
      response.send(rows);
    } else {
      response
        .status(404)
        .json({ Message: "No Reviews Related to given mealId" });
    }
  } catch (error) {
    throw error;
  }
});

// 3./api/reviews	POST	Adds a new review to the database
router.post("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const insertData = request.body;
    if (Object.keys(insertData).length === 0) {
      response.status(404).json({ Message: "Enter Review to insert" });
    } else {
      const [row] = await knex("Review").insert({
        title: insertData.title,
        description: insertData.description,
        meal_id: insertData.meal_id,
        //created_date: insertData.created_date,
        stars: insertData.stars,
      });
      if (row !== 0) {
        response.send({ message: "new review inserted", row });
      } else {
        response
          .status(400)
          .json({ Message: "Row not inserted please check your data" });
      }
    }
  } catch (error) {
    throw error;
  }
});
// 4./api/reviews/:id	GET	Returns a review by id
router.get("/:id", async (request, response) => {
  const getDataById = request.body;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const row = await knex("Review").where("id", request.params.id);
    if (row.length !== 0) {
      response.send(row);
    } else {
      response.status(404).json({ Message: "No Reviews Found with given id" });
    }
  } catch (error) {
    throw error;
  }
});

// 5./api/reviews/:id	PUT	Updates the review by id.
router.put("/:id", async (req, res) => {
  const putData = req.body;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const count = await knex("Review").where("id", req.params.id).update({
      title: putData.title,
      description: putData.description,
      meal_id: putData.meal_id,
      created_date: putData.created_date,
      stars: putData.stars,
    });
    if (count !== 0) {
      res.send({ Message: "Review Updated", count });
    } else {
      res
        .status(400)
        .json({ Message: "data not updated check your input data" });
    }
  } catch (error) {
    throw error;
  }
});

// 6./api/reviews/:id	DELETE	Deletes the review by id
router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const row = await knex("Review").where("id", request.params.id).del();
    if (row !== 0) {
      response.send({ Message: "Deleted" });
    } else {
      response
        .status(400)
        .json({ Message: "No  review found with given id to delete" });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
