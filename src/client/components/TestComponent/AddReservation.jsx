// @ts-nocheck
import React, { useState, useEffect } from "react";
import PostData from "./PostData";
import { useParams } from "react-router-dom";

const AddReservation = () => {
  const params = useParams();
  console.log(params);

  const [isvisible, setIsvisible] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number_of_guests, setNumber_of_guests] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [reservation, setReservation] = useState(null);
  const [exceedReservation, setExceedReservation] = useState(false);

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

  useEffect(() => {
    console.log('message here')
    console.log("reservation can added here");
    fetchItomReservation();
  }, []);

  const setStatesEmpty = () => {
    setName('');
    setEmail('');
    setNumber_of_guests('');
    setPhonenumber('');
    setCreated_date('');
  };


  const fetchItomReservation = async () => {
    try {
      const data = await fetch("api/meals?availableReservations=true");
      const eachReservationItem = await data.json();

      eachReservationItem.filter((eachItem) => {
        // @ts-ignore
        if (eachItem.id === Number(params.id)) {
          console.log(eachItem);
          setReservation(eachItem.unreserved);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addReservation = () => {
    console.log("hello please add reservation to meal");
    setIsvisible(!isvisible);
  };

  const sendData = (event) => {
    event.preventDefault();
      const reservationData = {
        meal_id: params.id,
        contact_phonenumber: phonenumber,
        contact_name: name,
        contact_email: email,
        number_of_guests: number_of_guests,
        created_date: created_date,
      };
      if (number_of_guests <= reservation) {
        const response= PostData("/api/reservations", reservationData);
        if (response) {
          alert("Reservation has been added");
          setStatesEmpty();
        } else {
          throw new Error(response.status);
        }
      } else {
        alert('We dont have enough meals')
        setExceedReservation(!exceedReservation);
      }
  };
  return (
    <div>
      <div className="Addbutton">
        <button onClick={addReservation}>Add Reservation</button>
      </div>

      {
// @ts-ignore
      reservation > 0 ? (
        <div className="formData">
          {isvisible && (
            <form onSubmit={sendData}>
              <br />
              <label htmlFor="name">*Name</label>
              <input
                type="text"
                id="name"
                className='title'
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <br />
              <label htmlFor="email">*Email</label>
              <input
                type="email"
                id="email"
                className='title'
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <br />
              <label htmlFor="number_of_guests">*Number of guests</label>
              <input
                type="number"
                id="number_of_guests"
                className='number_of_guests'
                name="number_of_guests"
                value={number_of_guests}
                required
                onChange={(e) => setNumber_of_guests(e.target.value)}
                placeholder="number of guests"
              />
              <br />

              <label htmlFor="phonenumber">*Phonenumber</label>
              <input
                type="text"
                id="phonenumber"
                className='phonenumber'
                name="phonenumber"
                value={phonenumber}
                required
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder="Phonenumber"
              />
              <br/>
              <label htmlFor="created_date">*Created_date</label>
              <input
                type="date"
                id="created_date"
                className='created_date'
                name="created_date"
                value={created_date}
                min={minDate()}
                required
                onChange={(e) => setCreated_date(e.target.value)}
                placeholder="number_of_guests"
              />
              <br />
              <button type="submit">Reserve Meal</button>
            </form>
          )}
        </div>
      ) : (
        <h2 style={{textAlign: "center", color: 'red'}}>This meal is currently not available to reserve</h2>
      )}
    </div>
  );
};
export default AddReservation;