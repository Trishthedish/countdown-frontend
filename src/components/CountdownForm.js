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
                <div>
                    <label htmlFor="title">Countdown Title</label>
                </div>

                <input
                    id="countdown-title"
                    name="title" 
                    onChange={onTitleChange}
                    type="text" 
                    value={formFields.title} 
                />

                <div>
                    <label htmlFor="date">Countdown Till Date</label>
                </div>

                <input 
                    id="countdown-date"
                    name="countdown-till-date"
                    onChange={onDateChange}
                    type="date"
                    value={formFields.date}
                />

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
                <div className="submit-button">
                    <input type="submit" value="Create Countdown" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CountdownForm;