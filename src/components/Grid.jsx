import React, { useState, useEffect } from "react";
import PathfindingLogic from "./PathfindingLogic";
import Car from "./Car";
import "./Grid.css";

function Grid({ gridSize }) {
  const [grid, setGrid] = useState([]);
  const [maze, setMaze] = useState([]);
  const [carPosition, setCarPosition] = useState(null);
  const [visitedPath, setVisitedPath] = useState([]);
  const [finalPath, setFinalPath] = useState([]);

  let [count, setCount] = useState(0);
  let [origin, setOrigin] = useState(null);
  let [destination, setDestination] = useState(null);

  useEffect(() => {
    setGrid(Array(gridSize * gridSize).fill(0));
  }, [gridSize]);

  const generateRandomArrayWithPath = (size, max) => {
    const array = Array.from({ length: size }, () =>
      Math.floor(Math.random() * (max + 1))
    );

    const startX = 0;
    const startY = 0;
    const endX = gridSize - 1;
    const endY = gridSize - 1;

    let currentX = startX;
    let currentY = startY;

    array[currentY * gridSize + currentX] = max + 1;

    const randomX = Math.floor(Math.random() * gridSize);

    while (currentX < randomX) {
      currentX++;
      array[currentY * gridSize + currentX] = max + 1;
    }

    while (currentY < endY) {
      currentY++;
      array[currentY * gridSize + currentX] = max + 1;
    }

    while (currentX < endX) {
      currentX++;
      array[currentY * gridSize + currentX] = max + 1;
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
      <div className="grid-wrapper">
        <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
          {renderGrid()}
        </div>
      </div>
      <button
        onClick={() => {
          const randomArray = generateRandomArrayWithPath(gridSize * gridSize, gridSize * gridSize - Math.floor(gridSize / 2));
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
          gridSize={gridSize}
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
