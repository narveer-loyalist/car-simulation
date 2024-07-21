import React, { useState } from "react";
import Grid from "./components/Grid";
import "./App.css";

function App() {
  const [gridSize, setGridSize] = useState(15);
  const [showGrid, setShowGrid] = useState(false);
  const [inputSize, setInputSize] = useState(15);

  const handleGenerateGrid = () => {
    if (inputSize >= 10 && inputSize <= 50) {
      setGridSize(inputSize);
      setShowGrid(true);
    } else {
      alert("Grid size must be between 10 and 50.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maze Pathfinding</h1>
      </header>
      <label class="grid-label">
        Grid Size:
        <input
          type="number"
          value={inputSize}
          onChange={(e) => setInputSize(Number(e.target.value))}
          min="10"
          max="50"
        />
      </label>
      <button onClick={handleGenerateGrid}>Generate Grid</button>
      {showGrid && <Grid gridSize={gridSize} />}
    </div>
  );
}

export default App;
