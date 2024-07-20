import React, { useEffect } from "react";

const PathfindingLogic = ({ start, end, maze, setCarPosition, setVisitedPath, setFinalPath }) => {
  useEffect(() => {
    const visited = new Set();
    let path = [];

    const animateDFS = async (current) => {
      if (current === end) {
        setFinalPath(path);
        return true;
      }

      visited.add(current);
      setVisitedPath((prev) => [...prev, current]);
      setCarPosition(current);

      const neighbors = getNeighbors(current);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && maze.includes(neighbor)) {
          path.push(neighbor);
          setCarPosition(neighbor);
          await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay as needed

          if (await animateDFS(neighbor)) {
            return true;
          }

          path.pop();
          setCarPosition(path[path.length - 1] || start);
          await new Promise((resolve) => setTimeout(resolve, 200)); // Adjust the delay as needed
        }
      }

      return false;
    };

    animateDFS(start);
  }, [start, end, maze, setCarPosition, setVisitedPath, setFinalPath]);

  return null;
};

const getNeighbors = (index) => {
  const neighbors = [];
  const row = Math.floor(index / 50);
  const col = index % 50;

  if (col > 0) neighbors.push(index - 1);
  if (col < 49) neighbors.push(index + 1);
  if (row > 0) neighbors.push(index - 50);
  if (row < 49) neighbors.push(index + 50);

  return neighbors;
};

export default PathfindingLogic;
