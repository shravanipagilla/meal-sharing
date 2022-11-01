const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/res", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows = await knex.raw("select * from Reservation");
    response.json(rows[0]);
  } catch (error) {
    throw error;
  }
});

// 1.Returns all reservations

router.get("/reservation", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows = await knex("Reservation").select("*");
    response.json(rows);
  } catch (error) {
    throw error;
  }
});
// 2.Adds a new reservation  to the database
router.post("/", async (req, res) => {
  try {
    const reqData = req.body;
    const insertData = await knex("Meal");
    if (Object.keys(insertData).length === 0) {
      res.status(404).json({ measssge: " error in data" });
    } else {
      const rows = await knex("Reservation").insert({
        number_of_guests: reqData.number_of_guests,
        meal_id: reqData.meal_id,
        created_date: reqData.created_date,
        contact_phonenumber: reqData.contact_phonenumber,
        contact_name: reqData.contact_name,
        contact_email: reqData.contact_email,
      });
      res.json({ message: "inserted new row in reservation table" });
    }
  } catch (error) {
    res.send({ massage: "it does not inserted" });
  }
});

// 3.Returns the Reservation by id
router.get("/:id", async (req, res) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const data = await knex("Reservation").where("id", req.params.id);
    if (data.length != 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    throw error;
  }
});

// 4.PUT	Updates the reservation by id

router.put("/:id", async (req, res) => {
  const putData = req.body;

  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const count = await knex("Reservation").where("id", req.params.id).update({
      number_of_guests: putData.number_of_guests,
      contact_phonenumber: putData.contact_phonenumber,
      created_date: putData.created_date,
      contact_name: putData.contact_name,
      contact_email: putData.contact_email,
    });
    if (count) {
      res.status(200).json({ count: "updated" });
    } else {
      res.send({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating new post", error: error });
  }
});

// 5.DELETE	  Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedRes = await knex("Reservation")
      .where("id", req.params.id)
      .del();
    if (deletedRes) {
      res.status(200).json({ updated: deletedRes });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating new post", error: error });
  }
});

module.exports = router;
