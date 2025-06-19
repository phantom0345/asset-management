import React from "react";
import { Link } from "react-router-dom";
import "./SalesCard.css";

const SalesCard = () => (
  <div className="card">
    <div className="icon">
      <i className="fas fa-building"></i>
    </div>
    <h3>Sales</h3>
    <p>We'd love to talk about how we can work together.</p>
    <Link to="/contact-form">
      <button className="card-button">Contact Sales</button>
    </Link>
  </div>
);

export default SalesCard;
