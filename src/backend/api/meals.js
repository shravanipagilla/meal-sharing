// @ts-nocheck
const { query } = require("express");
const express = require("express");
const { max, sum } = require("../database");
const router = express.Router();
const knex = require("../database");



router.get("/hh", async (request, response) => {
  try {
    const rows = await knex('Meal').select('*');
  
    response.json(rows);
  } catch (error) {
    throw error;
  }
});
// 1.maxPrice	Number	Returns all meals that are cheaper than maxPrice.	api/meals?maxPrice=90
router.get("/", async (request, response) => {
  const queryString=request.query;
    // 1.maxPrice
    if("maxPrice" in queryString){
      try{
      const maxPrice = Number(queryString.maxPrice);
      if(isNaN(maxPrice)){
        response.send('maxPrice should be a number ')
      }else{
             mealsData = await knex("Meal").where("price", "<", maxPrice);
         if(MaxPriceMeals.length !== 0){
          response.send(mealsData);
         }else {
          response.status(404).json({Message:'No Meals Found'})
         }
       }
      }catch(error){
        throw error;
      }
       // 2.availableReservations
    }else if("availableReservations" in queryString){
      const isTrueSet = (queryString.availableReservations.toLowerCase() === 'true');
      if(isTrueSet){
        try {
         const rows = await knex('Reservation').sum({guests:'Reservation.number_of_guests'})
        .join('Meal', 'Meal.id' ,'Reservation.meal_id')
        .select( 'Meal.title','Meal.id','Meal.max_reservations')
        .groupBy('Reservation.meal_id')
        .having('Meal.max_reservations','>','guests')
        if(rows.length !== 0){
          response.json(rows);
         }else {
          response.status(404).json({Message:'No Data Found'})
         }
        } catch (error) {
          throw error;
        }
      }
      // 3.title  like api/meals?title=Indian%20platter
    }else if("title" in queryString){
      const isTitle = queryString.title; 
      if(isTitle){
        try {
         const mealsWithTitle = await knex("Meal").select('id','title').where("title", "like", `%${isTitle}%`);
         if(mealsWithTitle.length !== 0){
          response.json(mealsWithTitle);
         }else {
          response.status(404).json({Message:'No Meals Found'})
         }
        } catch (error) {
          throw error;
        }
      }else{
        response.status(404).json({Message:'Enter some text to search in title'})
      }
        // 4.dateAfter like api/meals?dateAfter=2022-10-01
    }else if("dateAfter" in queryString){
      const givenDate = new Date(queryString.dateAfter); 
        try {
         const mealsWithDate = await knex("Meal").select('id','title',"when").where("when", ">", givenDate);
         if(mealsWithDate.length !== 0){
          response.json(mealsWithDate);
         }else {
          response.status(404).json({Message:'No Meals after given Date'})
         }
        } catch (error) {
          throw error;
        }
        // 5.dateBefore like api/meals?dateBefore=2022-08-08
    }else if("dateBefore" in queryString){
      const givenDate = new Date(queryString.dateBefore); 
        try {
         const mealsWithDate = await knex("Meal").select('id','title',"when").where("when", "<", givenDate);
         if(mealsWithDate.length !== 0){
          response.json(mealsWithDate);
         }else {
          response.status(404).json({Message:'No Meals before given Date'})
         }
        } catch (error) {
          throw error;
        }
        // 6.limit like api/meals?limit=7
      } else if("limit" in queryString){
        const givenLimit = Number(queryString.limit);
        if(!isNaN(givenLimit)){
        try {
          const rows = await knex('Meal').select('*').limit(givenLimit);
          if(rows.length !==0){
          response.json(rows);
        }else{
          response.status(404).json({Message:'No Meals found'})
        }
        } catch (error) {
          throw error;
        }
      }else {
        response.status(404).json({Message:'Enter only a number'})
      }
      // 7.sort_key like api/meals?sort_key=price
    }else if ("sort_key" in queryString && !("sort_dir" in queryString)){
      const isSort_key = queryString.sort_key;
      try {
        const  meals = await knex('Meal').orderBy(isSort_key);
        if(meals.length !== 0){
         response.json(meals);
        }else {
         response.status(404).json({Message:'No Meals before given Date'})
        }
       } catch (error) {
         throw error;
       }
    } else if ("sort_key" in queryString && "sort_dir" in queryString){
      const isSort_key = queryString.sort_key;
      const sortDir = queryString.sort_dir;
      try {
        const  meals = await knex('Meal').orderBy(isSort_key,sortDir);
        if(meals.length !== 0){
         response.json(meals);
        }else {
         response.status(404).json({Message:'No Meals before given Date'})
        }
       } catch (error) {
         throw error;
       }
    }
  
} 
  );


module.exports = router;
