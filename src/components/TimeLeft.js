import { useState, useEffect } from 'react';
import moment from 'moment';
import './TimeLeft.css';

const TimeLeft = (props) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        let timerId = setInterval(tick, 1000);
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    const tick = () => {
        setDate(new Date());
    }
    const calculateTimeLeft = (countdown) => {
        let target = moment(props.countdown_till_date)
        let current = moment()
        let diff = moment.duration(target.diff(current))
        let milliseconds = target.diff(current, 'milliseconds')

        if (milliseconds > 0) {
            return(
                <div className="time-left-container">
                    <section>{diff._data.years} years</section>
                    <section>{diff._data.months} months</section>
                    <section>{diff._data.days} days</section>
                    <section>{diff._data.hours} hours</section>
                    <section>{diff._data.minutes} minutes</section>
                    <section>{diff._data.seconds} seconds</section>
                </div>
            )
        }
        return (
            // TODO: Create display for completed or past events.
            <div>Countdown Complete!</div>
        )
    }

    return (
        <div>
            <h2>Time Left</h2>
            {calculateTimeLeft(props.countdown_till_date)}
        </div>
    )
}
export default TimeLeft;