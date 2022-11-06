// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navStyle = {
    color: "rgb(83, 17, 17)",
  };
  return (
    <header className="header">
      <div>
        <img
          src="https://i.ibb.co/RNsqzBk/img3.jpg"
          alt="logo"
          height="200"
          width="180"
        />
      </div>
      <h1>Welcome to Meal-Sharing</h1>
      <nav className="headerNav">
        <div className="links">
          <div className="nav-links">
            <Link to={"/"} style={navStyle}>
              <h1><li>Home</li></h1>
            </Link>
            <Link to={"/meals"} style={navStyle}>
              <h1><li>Meals</li></h1>
            </Link>
            <Link to={"/ContactUs"} style={navStyle}>
              <h1><li>ContactUS</li></h1>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
