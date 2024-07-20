import React, { useState } from "react";
import PathfindingLogic from "./Pathfindinglogic";
import Car from "./Car";
import "./Grid.css";

function Grid() {
  const [grid, setGrid] = useState(() => Array(2500).fill(0));
  const [maze, setMaze] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [visitedPath, setVisitedPath] = useState([]);
  const [finalPath, setFinalPath] = useState([]);

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
        setVisitedPath([]);
        setFinalPath([]);
      }
      return newCount;
    });
  };

  const renderGrid = () => {
    return grid.map((item, i) => (
      <div
        onClick={() => routeHandle(i)}
        key={i}
        className={`grid-cell ${i === origin ? "origin" : i === destination ? "destination" : finalPath.includes(i) ? "final-path" : visitedPath.includes(i) ? "visited" : maze.includes(i) ? "maze" : "wall"}`}
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
          setVisitedPath([]);
          setFinalPath([]);
          setCarPosition(null);
          setCount(0);
        }}
      >
        Create Random Maze
      </button>
      {origin !== null && destination !== null && (
        <PathfindingLogic
          start={origin}
          end={destination}
          maze={maze}
          setCarPosition={setCarPosition}
          setVisitedPath={setVisitedPath}
          setFinalPath={setFinalPath}
        />
      )}
    </>
  );
}

export default Grid;
