import './Countdown.css';
import { useState } from 'react';
import moment from 'moment';
import TimeLeft from './TimeLeft';

const Countdown = (props) => {
    const countdown = props.countdown;

    const convertDate = (tillDate) => {
        let newDate = new Date(tillDate);
        let properDate = moment(newDate).utc().format('YYYY-MM-DD')
        return properDate;
    }

    const [formFields, setFormFields] = useState({
        "title": countdown.title,
        "countdown_till_date": convertDate(countdown.countdown_till_date)
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
        console.log('trying to submit something')
        event.preventDefault();

        props.onSave({
            id: countdown.id,
            title: formFields.title,
            countdown_till_date: formFields.countdown_till_date
        }).then(props.refreshCountdowns).then(props.cancelEdit)
    };

    return (
    <div className="countdown-edit-form">
        {props.editMode ?

        <div className="countdown-form">
            <form onSubmit={onFormSubmit}>
               
                <label htmlFor="title">Countdown Title</label>

                <input
                    id="countdown-title"
                    name="title" 
                    type="text" 
                    value={formFields.title}
                    onChange={onTitleChange}
                />

                <label>Countdown Till Date</label>

                <input 
                    id="countdown-date"
                    name="countdown-till-date"
                    type="date"
                    value={formFields.countdown_till_date}
                    onChange={onDateChange}
                />

                <div>
                    <input type="submit" value="Save"  />
                    <button value="cancel" onClick={props.cancelEdit}>Cancel</button>
                </div>

            </form>
        </div>
        :
        <div key={countdown.id} className="countdown">
            <span>
                <button className="edit-button" onClick={props.handleEdit}>edit</button>
                <button className="delete-button" onClick={props.onDelete}>🗑</button>
            </span>
            <h3>{countdown.title}</h3>
            <p>Countdown: {countdown.countdown_till_date}</p>
            <TimeLeft countdown_till_date={countdown.countdown_till_date}/> 
        </div>
        }
    </div>
    )
}

export default Countdown;