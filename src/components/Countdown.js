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

    const convertTime = (tillDate) => {
        let newTime = new Date(tillDate);
        let properTime = moment(newTime).utc().format('HH:mm:ss')
        return properTime
    }
    const [formFields, setFormFields] = useState({
        "title": countdown.title,
        "date": convertDate(countdown.countdown_till_date),
        "time": convertTime(countdown.countdown_till_date)
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

        props.onSave({
            id: countdown.id,
            title: formFields.title,
            // the smooshing of time and date into DateTime
            countdown_till_date: moment(formFields.date + "T" + formFields.time + ":00" + moment.tz(moment.tz.guess()).format("Z")).toISOString()
        }).then(props.refreshCountdowns).then(props.cancelEdit)
    };
    
    return (
    <div className="countdown-edit-form">
        {props.editMode ?

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
                    id="countdonw-time"
                    name="countdown-till-time"
                    onChange={onTimeChange}
                    type="time"
                    value={formFields.time}
                />

                <div className="save-and-cancel-buttons">
                    <input className="save-button" type="submit" value="Save"  />
                    <button className="cancel-button" value="cancel" onClick={props.cancelEdit}>Cancel</button>
                </div>

            </form>
        </div>
        :
        <div key={countdown.id} className="countdown">
            <span>
                <button className="edit-button" onClick={props.handleEdit}>edit</button>
                <button className="delete-button" onClick={props.onDelete}>🗑</button>
            </span>
            <h2>{countdown.title}</h2>
            <p>{moment(countdown.countdown_till_date).format("LLL")}</p>
            <TimeLeft countdown_till_date={countdown.countdown_till_date}/> 
        </div>
        }
    </div>
    )
}

export default Countdown;