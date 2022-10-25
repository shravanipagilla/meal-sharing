const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
// adding reservations router here... 
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

const { route } = require("./api/meals");
// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());
const knex = require('knex')({
  client :'mysql2',
  connection: {
      host : process.env.DB_HOST,
      //@ts-ignorets-
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
  }
   })

router.use("/reservations", reservationsRouter);
router.use("/meals", mealsRouter);
// 1.Respond with all meals in the future (relative to the when datetime)
router.use("/future-meals", async (request, response) => {

  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows= await knex.raw("select * from Meal WHERE Meal.when > now()");
    response.json(rows[0]);
   } catch (error) {
    throw error;
  }
}),
router.use("/reviews",reviewsRouter);

// 2.Respond with all meals in the past (relative to the when datetime)
router.use("/past-meals", async (request, response) => {

  try {
    const rows= await knex.raw("select * from Meal WHERE Meal.when < now()");
    response.json(rows[0]);
   } catch (error) {
    throw error;
  }
}),

// 3.Respond with all meals sorted by ID
router.use("/all-meals", async (request, response) => {

  try {
    //const rows = await knex.raw("select MIN(id) from Meal")
    const rows= await knex.raw("select * from Meal ORDER BY id");
    response.json(rows[0]);
   } catch (error) {
    throw error;
  }
}),

// 4.Respond with the first meal (meaning with the minimum id)
router.use("/first-meal", async (request, response) => {

  try {
    //const rows = await knex.raw("select MIN(id) from Meal")
    const rows= await knex.raw("select * from Meal WHERE id  LIMIT 1");
    response.json(rows[0]);
   } catch (error) {
    throw error;
  }
}),

// 5.Respond with the last meal (meaning with the maximum id)
router.use("/last-meal", async (request, response) => {

  try{
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const row= await knex.raw(" select * from Meal ORDER BY id DESC LIMIT 1");
    if(row.length> 0 ){
    response.json(row[0])
  }else{
    response.status(404).json({ error: "No meals found"})
   } 
  }
   catch (error) {
    console.error(error)
    response.status(500).send("Internal server error")
    }

});
if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}
// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;

