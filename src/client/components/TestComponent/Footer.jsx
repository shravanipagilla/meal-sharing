import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="socialMedia">
        <ul>
          <li>
            <a href="https://facebook.com/meal-sharing_db">
              <img
                src="https://img.icons8.com/fluency/50/000000/facebook.png"
                alt="facebook!"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/meal-sharing_db">
              <img
                src="https://img.icons8.com/color/50/000000/twitter-squared.png"
                alt="twitter!"
              />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/meal-sharing_db">
              <img
                src="https://img.icons8.com/fluency/50/000000/instagram-new.png"
                alt="instagram!"
              />
            </a>
          </li>
          <li>
            <a href="https://yahoo.com/meal-sharing_db">
              <img
                src="https://img.icons8.com/doodle/48/000000/yahoo--v1.png"
                alt="yahoo!"
              />
            </a>
          </li>
          <li>
            <a href="https://google.com/meal-sharing_db">
              <img
                src="https://img.icons8.com/fluency/48/000000/google-logo.png"
                alt="google!"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright">
        CopyRight@2022, Mealsharing-website Designed by{" "}
        <a href="https://github.com/shravanipagilla" target="_blank">
          {" "}
          Shravanipagilla
        </a>
        .
      </div>
    </footer>
  );
}
