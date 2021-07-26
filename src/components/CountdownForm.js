import './CountdownForm.css';

import { useState } from "react";

const CountdownForm = (props) => {    
    const [formFields, setFormFields] = useState({
        "title": "",
        "countdown_till_date": ""
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
            countdown_till_date: event.target.value
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        props.addCountdownCallback({
            title: formFields.title,
            countdown_till_date: formFields.countdown_till_date
        });

        setFormFields({
            title: "",
            countdown_till_date: ""
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
                    value={formFields.countdown_till_date}
                />
                <input type="submit" value="Create Countdown"  />
            </form>
        </div>
    )
}

export default CountdownForm;