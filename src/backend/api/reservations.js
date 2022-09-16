const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows = await knex.raw("select * from Reservation");
    response.json(rows);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
