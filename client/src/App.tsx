import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Switcher from './components/Switcher';
import Home from './components/Home';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/hello').then(d => setData(d.data));
  }, []);
  console.log(data);

  return (
    <div className="app">
      <Home/>
      <Switcher />
    </div>
  );
}

export default App;
