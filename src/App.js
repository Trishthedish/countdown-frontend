import CountdownList from './components/CountdownList';
import CountdownForm from './components/CountdownForm';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
   const [countdowns, setCountdowns] = useState([])
   const [errorMessage, setErrorMessage] = useState('')

  const API_BASE_URL = 'http://localhost:5000';

  const refreshCountdowns = () => {
    axios.get(`${API_BASE_URL}/countdowns`)
    .then((response) => {
      setCountdowns(response.data)
      setErrorMessage('');
    }).catch((error) => {
      setErrorMessage('there has been an error: ', error);
    });
  }

  useEffect(() => {
    refreshCountdowns()
  }, []);

  const createCowndown = (newCountdown) => {
    axios.post(`${API_BASE_URL}/countdowns`, newCountdown).then((response) => {
      refreshCountdowns()
    })
    .catch((error) => {
      console.log('error --> ', error);
    });
  }

  const deleteCountdown = (id) => {
    axios.delete(`${API_BASE_URL}/countdowns/${id}`)
    .then(refreshCountdowns)
  }

  const editCountdown = (id) => {
    console.log('more than ID __> ', id)
    // also need a way to pass payload.
    // so in this case: 
    // {
    //   "title": 'new title info'
    // }
    axios.put(`${API_BASE_URL}/countdowns/${id}`, {})

  }

  return (
    <div className="App">
      <h1>Countdown Clock App</h1>
      <div>

      </div>
      <h1>{errorMessage}</h1>
      <CountdownForm 
        addCountdownCallback={createCowndown}
      />
      <CountdownList
        onEdit={editCountdown}
        onDelete={deleteCountdown}
        countdowns={countdowns}
        // editMap={editMap}
        // setEditMap={setEditMap}
      />
    </div>
  );
}

export default App;