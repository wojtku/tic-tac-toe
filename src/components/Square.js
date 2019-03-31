import React from "react";
import "../index.css";

export default ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
