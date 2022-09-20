const { request } = require("express");
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
    const insertData = req.body;
    const row = await knex("Meal");
    if (Object.keys(insertData).length === 0){
      res.status(200).json({inserted: insertData})
}else{
    const insertData= req.body
    const rows = await knex('Meal').
    insert({ 
      title: insertData.title,
      description: insertData.description,
      location: insertData.location, 
      when: insertData.when, 
      max_reservations: insertData.max_reservations, 
      price: insertData.price, 
      created_date: insertData.created_date});
   res.send({message:"inserted new row"});
    }
}catch(error){
    res.send({message:"it does not insert"});
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

   const putData = req.body;
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info

    const count = await knex('Meal').where('id', req.params.id) 
    .update({
      title: putData.title,
      description: putData.description,
      location: putData.loc, 
      when: putData.when, 
      max_reservations: putData.max_res, 
      price: putData.price, 
      created_date: putData.created_date
    });
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
