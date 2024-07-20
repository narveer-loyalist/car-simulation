// Pathfindinglogic.jsx
const PathfindingLogic = (start, end, maze) => {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start);
  
    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];
  
      if (node === end) {
        return path;
      }
  
      const neighbors = getNeighbors(node);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && maze.includes(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
  
    return [];
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
  