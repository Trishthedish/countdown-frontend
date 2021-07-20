import './App.css';
import { useState } from 'react';
import axios from 'axios'
import moment from 'moment'


function App() {
   const [countdowns, setCountdowns] = useState([])
   console.log('countdowns: ', countdowns)
   const [errorMessage, setErrorMessage] = useState('')

   const getCountdowns = () => {
     axios.get('http://localhost:5000/countdown')
     .then((response) => {
       console.log('response ---> ', response)
       console.log('response.data?', response.data)
       setCountdowns(response.data);
       setErrorMessage('');
     }).catch((error) => {
       setErrorMessage('there has been an error: ', error);
     });
   };

   const onButtonClick = () => {
     getCountdowns();
   };

  return (
    <div className="App">
      <h1>Countdown Clock App</h1>
      <button onClick={onButtonClick}>Get Count Down Events</button>
      <div>
        {countdowns.map(countdown =>
          <ul>
            <li>{countdown.title}</li>
            <li>{countdown.countdown_till_date}</li>
            <li>{moment(countdown.countdown_till_date).fromNow()}</li>
          </ul>
        )}
      </div>
      <h1>{errorMessage}</h1>
    </div>
  );
}

export default App;