import React from "react";
import carImage from "./car.svg";
import "./Car.css";

const Car = () => (
  <img
    src={carImage}
    alt="Car"
    className="car-image"
  />
);

export default Car;
