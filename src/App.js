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
    return axios.get(`${API_BASE_URL}/countdowns`)
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
    return axios.post(`${API_BASE_URL}/countdowns`, newCountdown).then((response) => {
      refreshCountdowns()
    })
    .catch((error) => {
      console.log('error --> ', error);
    });
  }

  const deleteCountdown = (id) => {
    return axios.delete(`${API_BASE_URL}/countdowns/${id}`)
    .then(refreshCountdowns)
  }

  const updateCountdown = (countdown) => {
    return axios.put(`${API_BASE_URL}/countdowns/${countdown.id}`, countdown)
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
        onSave={updateCountdown}
        onDelete={deleteCountdown}
        countdowns={countdowns}
        refreshCountdowns={refreshCountdowns}
      />
    </div>
  );
}

export default App;