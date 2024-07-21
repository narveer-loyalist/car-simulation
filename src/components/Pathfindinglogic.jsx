import React, { useEffect } from "react";

const PathfindingLogic = ({ start, end, gridSize, maze, setCarPosition, setVisitedPath, setFinalPath }) => {
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

      const neighbors = getNeighbors(current, gridSize);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && maze.includes(neighbor)) {
          path.push(neighbor);
          setCarPosition(neighbor);
          await new Promise((resolve) => setTimeout(resolve, 200));

          if (await animateDFS(neighbor)) {
            return true;
          }

          path.pop();
          setCarPosition(path[path.length - 1] || start);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      return false;
    };

    animateDFS(start);
  }, [start, end, gridSize, maze, setCarPosition, setVisitedPath, setFinalPath]);

  return null;
};

const getNeighbors = (index, gridSize) => {
  const neighbors = [];
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  if (col > 0) neighbors.push(index - 1);
  if (col < gridSize - 1) neighbors.push(index + 1);
  if (row > 0) neighbors.push(index - gridSize);
  if (row < gridSize - 1) neighbors.push(index + gridSize);

  return neighbors;
};

export default PathfindingLogic;
