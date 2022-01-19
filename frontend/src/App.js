import './App.css';
import React, {useState, useEffect } from 'react';
import axios from 'axios';

// const serverUrl = process.env.REACT_APP_HOST + 'api';
const serverUrl = 'http://localhost:5000/api';

function App() {
  const [items, setItem] = useState(0);

  useEffect(() => {
    axios
      .get(serverUrl + "/items")
      .then((items) => {
        console.log(items.data);
        setItem(items.data);
      }).catch((err) => {
        console.log(err)
      })
  })

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
