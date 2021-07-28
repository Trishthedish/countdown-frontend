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
                <div>
                    <div>
                        <table className="time-left-table">
                            <tbody>
                                <tr>
                                    <th>Years</th>
                                    <th>Months</th>
                                    <th>Days</th>
                                    <th>Hours</th>
                                    <th>Minutes</th>
                                    <th>Seconds</th>
                                </tr>
                                <tr>
                                    <td>{diff._data.years}</td>
                                    <td>{diff._data.months}</td>
                                    <td>{diff._data.days}</td>
                                    <td>{diff._data.hours}</td>
                                    <td>{diff._data.minutes}</td>
                                    <td>{diff._data.seconds}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
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
            <h4>Time Left</h4>
            {calculateTimeLeft(props.countdown_till_date)}
        </div>
    )
}
export default TimeLeft;