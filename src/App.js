import CountdownList from './components/CountdownList';
import CountdownForm from './components/CountdownForm';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment-timezone';

function App() {
   const [countdowns, setCountdowns] = useState([])
   const [errorMessage, setErrorMessage] = useState('')

  const API_BASE_URL = 'http://localhost:5000';
  const API_HEROKU_BASE_URL = 'https://countdown-event-api.herokuapp.com/'

  const refreshCountdowns = () => {
    return axios.get(`${API_HEROKU_BASE_URL}/countdowns`)
    .then((response) => {
      for (let countdown of response.data) {
        // creating new moment object with the 
        // supplied countdown_till_date
        let date = moment(countdown.countdown_till_date)
        countdown.countdown_till_date = date.format("YYYY-MM-DDTHH:mm:ssZ")
      }
      setCountdowns(response.data)
      setErrorMessage('');
    }).catch((error) => {
      setErrorMessage('there has been an error: ', error);
    });
  }

  useEffect(() => {
    refreshCountdowns()
  }, []);
  const isISODate = (date) => {
    let dateParsed = new Date(Date.parse(date));
    return (dateParsed.toISOString() === date)
  }

  const createCowndown = (newCountdown) => {
    let date = newCountdown.countdown_till_date
    if(!isISODate(date)){
      console.log("ISOString format error", date)
    }
    return axios.post(`${API_HEROKU_BASE_URL}/countdowns`, newCountdown).then((response) => {
      refreshCountdowns()
    })
    .catch((error) => {
      console.log('error --> ', error);
    });
  }

  const deleteCountdown = (id) => {
    return axios.delete(`${API_HEROKU_BASE_URL}/countdowns/${id}`)
    .then(refreshCountdowns)
  }

  const updateCountdown = (countdown) => {
    return axios.put(`${API_HEROKU_BASE_URL}/countdowns/${countdown.id}`, countdown)
  }

  return (
    <div className="App">
      <h1 className="app-title">Countdown Clock App</h1>
  
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