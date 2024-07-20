// Car.jsx
import React from "react";
import carImage from "./car.svg";
import "./Car.css";

const Car = () => {
  return <img src={carImage} alt="Car" className="car-image" />;
};

Car.moveCar = (path, setCarPosition) => {
  path.forEach((position, index) => {
    setTimeout(() => {
      setCarPosition(position);
    }, index * 500);
  });
};

export default Car;
