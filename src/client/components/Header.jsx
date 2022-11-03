// @ts-nocheck
import React from "react";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";


export default function Header() {
    const navStyle = {
        color: "rgb(83, 17, 17)",
      };
    return (
        <header className="header">
            <div>
                <img src={logo} alt="logo"  height="200" width="180"/>
            </div>
            <h1>Welcome to Meal-Sharing</h1>
            <nav className="headerNav">
            {/* <Link to={"/"} style={navStyle}>
          <p>Home</p>
           </Link>
               
                <p>AboutUs</p>
                <p>ContactUS</p>  */}
                <nav>
      <img className='header-logo'
        src="https://i.ibb.co/RNsqzBk/img3.jpg"
        alt="MealSharing logo"
         width="180"
         height="120"
      />
      <ul className="nav-links">
        <Link to={"/"} style={navStyle}>
          <li>Home</li>
        </Link>
        <Link to={"/meals"} style={navStyle}>
          <li>Meals</li>
        </Link>

      </ul>
    </nav>
            </nav>
        </header>
    )
}