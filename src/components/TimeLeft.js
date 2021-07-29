import { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import './TimeLeft.css';

const TimeLeft = (props) => {
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(new Date());

    const callBackRef = useCallback(audioEl => {
        if (audioEl !== null) {
            audioEl.src = "/melodic-clock-strike.mp3";
            audioEl.play()
        }
    },[]) 

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
            <div>
                <h2 className="countdown-complete">Countdown Complete!</h2>
                <audio
                    ref={callBackRef}
                    autoplay="true"
                />
            </div>
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