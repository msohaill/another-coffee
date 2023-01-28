import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState('');

  setInterval(() => axios.get('http://localhost:8000/hello').then(d => setData(d.data)), 1000)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Data: {JSON.stringify(data)}</p>
      </header>
    </div>
  );
}

export default App;
