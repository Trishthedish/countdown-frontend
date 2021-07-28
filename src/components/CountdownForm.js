import './CountdownForm.css';
import moment from 'moment-timezone';

import { useState } from "react";

const CountdownForm = (props) => {    
    const [formFields, setFormFields] = useState({
        "title": "",
        "date": "",
        "time": ""
    })

    const onTitleChange = (event) => {
        setFormFields({
            ...formFields,
            title: event.target.value
        })
    };

    const onDateChange = (event) => {
        setFormFields({
            ...formFields,
            date: event.target.value
        })
    };

    const onTimeChange = (event) => {
        setFormFields({
            ...formFields,
            time: event.target.value
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addCountdownCallback({
            title: formFields.title,
            countdown_till_date: moment(formFields.date + "T" + formFields.time + ":00" + moment.tz(moment.tz.guess()).format('Z')).toISOString()
        });

        setFormFields({
            title: "",
            date: "",
            time: ""
        })
    };
 
    return (
        <div className="countdown-form">
            <form onSubmit={onFormSubmit}>
                
                <label htmlFor="title">Countdown Title</label>
                <input
                    id="countdown-title"
                    name="title" 
                    onChange={onTitleChange}
                    type="text" 
                    value={formFields.title} 
                />

                <label>Countdown Till Date</label>
                <input 
                    id="countdown-date"
                    name="countdown-till-date"
                    onChange={onDateChange}
                    type="date"
                    value={formFields.date}
                />
                {/* surrounded in div to keep it off same line. TO DO: accomplish with css*/}
                
                <div>
                    <label htmlFor="time">Time</label>
                </div>
                <input 
                    id="countdown-time"
                    name="countdown-till-time"
                    onChange={onTimeChange}
                    type="time"
                    value={formFields.time}
                />
                <input type="submit" value="Create Countdown"  />
            </form>
        </div>
    )
}

export default CountdownForm;