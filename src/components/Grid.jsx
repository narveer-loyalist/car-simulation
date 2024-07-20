// Grid.jsx
import React, { useState, useEffect } from "react";
import PathfindingLogic from "./Pathfindinglogic";
import Car from "./Car";
import "./Grid.css";

function Grid() {
  const [grid, setGrid] = useState(() => Array(2500).fill(0));
  const [maze, setMaze] = useState([]);
  const [path, setPath] = useState([]);
  const [carPosition, setCarPosition] = useState(null);

  let [count, setCount] = useState(0);
  let [origin, setOrigin] = useState(null);
  let [destination, setDestination] = useState(null);

  const generateRandomArrayWithPath = (size, max) => {
    const array = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max + 1))
    );

    const startX = 0;
    const startY = 0;
    const endX = 49;
    const endY = 49;

    let currentX = startX;
    let currentY = startY;

    array[currentY * 50 + currentX] = max + 1;

    const randomX = Math.floor(Math.random() * 50);

    while (currentX < randomX) {
      currentX++;
      array[currentY * 50 + currentX] = max + 1;
    }

    while (currentY < endY) {
      currentY++;
      array[currentY * 50 + currentX] = max + 1;
    }

    while (currentX < endX) {
      currentX++;
      array[currentY * 50 + currentX] = max + 1;
    }

    return array;
  };

  const routeHandle = (index) => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount % 2 === 1) {
        setOrigin(index);
        setCarPosition(index);
      } else {
        setDestination(index);
        highlightPath(index);
      }
      return newCount;
    });
  };

  const highlightPath = (end) => {
    const path = PathfindingLogic(origin, end, maze);
    if (path.length > 0) {
      setPath(path);
    } else {
      alert("No path found");
    }
  };

  useEffect(() => {
    if (path.length > 0 && destination !== null) {
      Car.moveCar(path, setCarPosition);
    }
  }, [path, destination]);

  const renderGrid = () => {
    return grid.map((item, i) => (
      <div
        onClick={() => routeHandle(i)}
        key={i}
        className={`grid-cell ${i === origin ? "origin" : i === destination ? "destination" : path.includes(i) ? "path" : maze.includes(i) ? "maze" : "wall"}`}
      >
        {carPosition === i && <Car />}
      </div>
    ));
  };

  return (
    <>
      <div className="grid-container">
        {renderGrid()}
      </div>
      <button
        onClick={() => {
          const randomArray = generateRandomArrayWithPath(2500, 2400);
          setMaze(randomArray);
          setOrigin(null);
          setDestination(null);
          setPath([]);
          setCarPosition(null);
          setCount(0);
        }}
      >
        Create Random Maze
      </button>
    </>
  );
}

export default Grid;
