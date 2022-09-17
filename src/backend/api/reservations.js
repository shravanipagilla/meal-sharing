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
  router.post("/", async (req,res) =>{
    try {
      const rows = await knex('Reservation').insert({ number_of_guests: 3,meal_id: 1,created_date: '2022-10-11',contact_phonenumber : "22435674",contact_name: "ram",contact_email: "ram@123"});
     res.json(rows);
    }catch(error){
      throw error;
    }
  });

  // 3.Returns the Reservation by id
  router.get("/:id", async (req, res) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
  
      const data= await knex('Reservation').where('id', req.params.id);
      if(data.length != 0){
        res.json(data);
      }else{
        res.status(404).json({message: "Record not found"})      
    }
    } catch (error) {
      throw error;
    }
  });

  // 4.PUT	Updates the reservation by id

router.put("/:id", async (req, res) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
  
      const count = await knex('Reservation').where('id', req.params.id) .update('created_date' ,'2022-11-10' );      
      if(count){
        res.status(200).json({updated: count})
      } else {
        res.status(404).json({message: "Record not found"})
      }
    
      } catch (error) {
        res.status(500).json({message: "Error updating new post", error: error})  }
  });

  // 5.DELETE	  Deletes the reservation by id
router.delete("/:id", async(req, res) => {
    try {
      const deletedRes= await knex('Reservation').where('id', req.params.id).del()
      if(deletedRes){
        res.status(200).json({updated: deletedRes})
      } else {
        res.status(404).json({message: "Record not found"})
      }
    
      } catch (error) {
        res.status(500).json({message: "Error updating new post", error: error})  }
  });


module.exports = router;
