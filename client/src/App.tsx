import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import Switcher from './components/Switcher';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/hello').then(d => setData(d.data));
  }, []);


  return (
    <div className="app">

      <Switcher />
    </div>
  );
}

export default App;
