const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/title", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows= await knex("Meal").select("title");
    response.json(rows);
  } catch (error) {
    throw error;
  }
});

// 1.Returns all meals

router.get("/meals", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const rows = await knex("Meal").select("*");
    response.json(rows);
  } catch (error) {
    throw error;
  }
});

// 2.Adds a new meal to the database

router.post("/", async (req,res) =>{
  try {
    const rows = await knex('Meal').insert({ title: 'curd rice', description: 'curd with rice', location: 'roskilde', when: '2022-08-24', max_reservations: 4, price: 220, created_date: '2022-07-17' });
   res.json(rows);
  }catch(error){
    throw error;
  }
});

// 3.Returns the meal by id

router.get("/:id", async (req, res) => {
  try {
    const data = await knex('Meal').where('id', req.params.id);
    if(data.length != 0){
      res.json(data);
    }else{
      res.status(404).json({message: "Record not found"})
        }
  } catch (error) {
    throw error;
  }
});

// 4.PUT	Updates the meal by id

router.put("/:id", async (req, res) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const count = await knex('Meal').where('id', req.params.id) .update({location:'solrød'});
    if(count){
    res.status(200).json({updated: count})
  } else {
    res.status(404).json({message: "Record not found"})
  }

  } catch (error) {
    res.status(500).json({message: "Error updating new post", error: error})  }
});

// 5.DELETE	  Deletes the meal by id
router.delete("/:id", async(req, res) => {
  try {
    const deleted = await knex('Meal').where('id', req.params.id).del()
    if(deleted){
      res.status(200).json({updated: deleted})
    } else {
      res.status(404).json({message: "Record not found"})
    }
  
    } catch (error) {
      res.status(500).json({message: "Error updating new post", error: error})  }
});


module.exports = router;
