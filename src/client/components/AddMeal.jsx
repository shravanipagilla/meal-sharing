// @ts-nocheck

import React, { useState } from "react";
import PostData from "./TestComponent/PostData";
const AddMeal = () => {
  const [isvisible, setIsvisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [location, setLocation] = useState("");
  const [max_reservations, setMax_reservations] = useState("");
  const [price, setPrice] = useState("");
  const [when, setWhen] = useState("");
  const minDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const currentDate = `${year}${"-"}${
      month < 10 ? `0${month}` : `${month}`
    }${"-"}${date < 10 ? `0${date}` : `${date}`}`;
    
    console.log(currentDate)
    return currentDate;
  };
  const addMeal = () => {
    setIsvisible(!isvisible);
  };
  const setStatesEmpty=()=>{
    setTitle("");
    setDescription("");
    setLocation("");
    setWhen("");
    setPrice("");
    setCreated_date("");
    setMax_reservations("");
  
  }
  const sendData = (e) => {
    e.preventDefault();
      const mealData = {
        title: title,
        description: description,
        created_date: created_date,
        location: location,
        max_reservations: max_reservations,
        price: price,
        when: when,
      };
      const response= PostData("/api/meals", mealData);
      if (response) {
        alert("Thank You For Adding Meal");
        setStatesEmpty();
      } else {
        throw new Error(response.status);
      }
  };
  return (
    <div>
      <div className="Addbutton">
        <h1>
          Happy to see you , Thank you for visiting our page : Would you like to share your recepie?? please click the
          button..
        </h1>
        <button onClick={addMeal}>Add Meal</button>
      </div>
      <div className="formData">
        {isvisible && (
          <form onSubmit={sendData}>
            <br />
            <label htmlFor="title">*Title</label>
            <input
              type="text"
              id="title"
              className='title'
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <br />
            <label htmlFor="description">*Description</label>
            <input
              type="text"
              id="description"
              className='addmeal_description'
              name="description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <br />
            <label htmlFor="created_date">*Create Date</label>
            <input
              type="date"
              id="created_date"
              className='created_date'
              name="created_date"
              value={created_date}
              min={minDate()}
              required
              onChange={(e) => setCreated_date(e.target.value)}
              placeholder="Created_date"
            />
            <br />
            <label htmlFor="location">*Location</label>
            <input
              type="text"
              id="location"
              className='location'
              name="location"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <br />
            <label htmlFor="max_reservations">*Maximum Reservations</label>
            <input
              type="text"
              id="max_reservations"
              name="max_reservations"
              className='max_reservations'
              value={max_reservations}
              required
              onChange={(e) => setMax_reservations(e.target.value)}
              placeholder="Max_reservations"
            />
            <br />
            <label htmlFor="price">*Price</label>
            <input
              type="number"
              id="price"
              className='price'
              name="price"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            <br />
            <label htmlFor="when" className='label-meal-available-frm'>*Meal Available From</label>
            <input
              type="date"
              id="when"
              className='when'
              name="when"
              value={when}
              min={minDate()}
              required
              onChange={(e) => setWhen(e.target.value)}
              placeholder="When"
            />
            <br />
            <br />
            <button type="submit">Submit </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default AddMeal;