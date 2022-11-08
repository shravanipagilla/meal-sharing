import React from "react";
import "./contactus.css"

function ContactUS() {
  return (
    <div className="contacts">
      <nav className="nav">
        <div className="starts">
          <h1>HOTEL DATAILS</h1>
          <li>Our Services</li>
          <li>Terms & Conditons</li>
          <li>Blog</li>
        </div>
        <br />
        <div>
          <h1 id="contact">CONTACT INFORMATION</h1>
          <li>Gmail: mealsharing_spagilla@gmail.com</li>
          <li>Phone: +45 98765432</li>
        </div>
        <div id="social-media" className="contacts-right">
          <h1>ADDRESS</h1>
          <li>samsøens alle 41</li>
          <li>Danneskiold</li>
          <li>københaven</li>
          <li>1434</li>
        </div>
      </nav>
    </div>
  );
}

export default ContactUS;
