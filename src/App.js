import React from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Maze Pathfinding</h1>
      </header>
      <main>
        <Grid />
      </main>
    </div>
  );
}

export default App;
